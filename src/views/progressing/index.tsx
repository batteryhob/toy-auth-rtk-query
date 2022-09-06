import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";

import { getExpireTimeState, setExpireTime, init as initExpireTime } from "../../features/expireTimeSlice";
import { useGetExpireTimeMutation, useGetGuideQuery, useGetServerTimeQuery, useSetCompleteMutation } from "../../services/easysignApi";

import Button from "../../shared/button";
import Timer from "./components/timer";

import moment from "moment";
import "./index.scss";
import { getRegisterState, setRegisterStatus } from "../../features/registerSlice";

/*
  인증뷰
  1) 저장된 인증 시간과, 서버시간을 비교하여 타이머 시간을 세팅
  2) 타이머가 동작하면, 가이드를 요청하여 사용자에게 보여줌
*/
function Progressing() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  //redux
  const { data: expiredTime } = useAppSelector(getExpireTimeState);
  const { data: registerData, status} = useAppSelector(getRegisterState);

  //state
  const [ guideSkip, setGuideSkip ] = useState<boolean>(true);
  const [ diff, setDiff ] = useState<number>(0);
  const [ guides, setGuides ] = useState<Array<any>>([]);
  const [ isExpired, setIsExpired ] = useState<boolean>(false);

  //rtk-query
  const { data: serverTimeResponse, refetch: serverTimeRefetch } = useGetServerTimeQuery(undefined);
  const { data: guideResponse, refetch: guideRefetch } = useGetGuideQuery(undefined, {
    skip: guideSkip
  });

  const [getExpireTime, expireTimeResponse] = useGetExpireTimeMutation();
  const [setComplete, { data: completeResponse, error: completeError}] = useSetCompleteMutation();
  
  useEffect(()=>{
    if(serverTimeResponse){
      const current = moment(serverTimeResponse.data.serverTime);
      const target = moment(expiredTime.expiredAt);

      let diff: number = Number(moment.duration(target.diff(current)).asSeconds().toFixed(0)) || 0;
      setDiff(diff);

      if(guideSkip)
        setGuideSkip(false);
      else
        guideRefetch();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[serverTimeResponse]);

  useEffect(()=>{
    if(guideResponse){
      setGuides(guideResponse.data.easysign.guides);
    }
  },[guideResponse]);

  //인증 완료
  useEffect(()=>{    
    if(completeResponse){
      dispatch(setRegisterStatus('completed'));
    }
  },[completeResponse, navigate, dispatch]);

  //인증 실패
  useEffect(()=>{
    if(completeError){
      if('data' in completeError){
        const result: any = completeError.data;
        alert(result.error.message);
        dispatch(initExpireTime());
      }      
    }
  },[completeError, dispatch]);

  //인증 재요청
  useEffect(()=>{
    if(expireTimeResponse.data?.ok){
      dispatch(setExpireTime(expireTimeResponse.data.data));
      serverTimeRefetch();
    }
  },[expireTimeResponse, serverTimeRefetch, dispatch]);

  //인증완료 API 호출
  function goComplete(){
    if(isExpired){
      setDiff(0);
      const result = window.confirm("인증 요청시간이 지났습니다.\n간편인증을 다시 시도해 주세요.");
      if(result){
        getExpireTime(undefined);
      }else{
        dispatch(initExpireTime());
      }
    }else{
      setComplete(registerData);
    }   
  }

  //저장된 만료시간이 없으면, 메인뷰로 이동
  if(Object.keys(expiredTime).length === 0){
    return <Navigate to="/" replace />;
  }

  //완료 상태 시, 이동
  if(status === 'completed'){
    return <Navigate to="/completed" replace />;
  }

  return (
    <section className="progress">
      <div className="progress-wrapper">
          <div className="progress-title">
            <h1>카카오 지갑으로<br/>간편인증 요청을 보냈습니다.</h1> 
            <div className="progress-timer-wrapper">
              <Timer propSeconds={diff} setIsExpired={setIsExpired}/>
            </div>           
          </div>
          <div className="progress-divider">
          </div>
          <div className="progress-guide">
            <ul>
              {
                guides.map((e: any, i: number)=>{
                  return (
                    <li key={i} className="progress-guide-item">
                      <div className="thumbnail">
                        <img src={e.image} alt={e.title} />
                      </div>
                      <div className="description">
                        <div className="title">
                          {e.title}
                        </div>
                        <div className="desc">
                          {e.description}
                        </div>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <div className="progress-btn-group">
            <Button label={"인증 완료"} disabled={false} clickFunc={goComplete}></Button>
          </div>
      </div>
    </section>
  );
}

export default Progressing;
