import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setExpireTime } from "../../features/expireTimeSlice";
import { setRegisterData } from "../../features/registerSlice";
import { useGetExpireTimeMutation } from '../../services/easysignApi'

import Button from "../../shared/button";
import Modal from "../../shared/modal";
import Form from "./components/form";
import MainModal from "./components/mainModal";

import "./index.scss";

export interface ValidatedData {
  validated: boolean,
  name?: string,
  phoneNumber?: string,
  regNumber?: string
}

/*
  메인뷰
  벨리데이션 값이 정상이면, expireTime을 요청하고 다음 뷰로 진행
*/
function Main() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //rtk-query
  const [getExpireTime, response] = useGetExpireTimeMutation();

  //state
  const [validated, setValidated] = useState<boolean>(false);
  const [allChecked, setAllChecked] = useState<boolean>(false);

  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(()=>{
    if(response.data?.ok){
      dispatch(setExpireTime(response.data.data));
      navigate(`/progressing`);
    }
  },[response, dispatch, navigate]);

  //벨리데이션 데이터 세팅
  function setValidatedData(validatedData: ValidatedData){
    setValidated(validatedData.validated);
    if(validatedData.validated){
      dispatch(
        setRegisterData({
          name: validatedData.name,
          phoneNumber: validatedData.phoneNumber,
          regNumber: validatedData.regNumber,
        })
      )
    }
  }
  //모달 보여주기
  function showModal(){
    setIsVisible(true);
  }
  //인증 API 호출
  function goProgress(){
    getExpireTime(undefined);
  }

  return (
    <section className="main">
      <div className="main-wrapper">
        <div className="main-title">
          <h1>정확한 환급액 조회를 위해<br/>아래 정보가 필요해요.</h1>
          <div className="main-title-info">
            <div className="text"><p>고객님의 정보는 <span className="strong">안전하게 보호</span>되니<br/>안심하고 입력하세요.</p></div>
            <div className="icon"><img src="/imgs/ico_info.svg" alt="아이콘" /></div>
          </div>
        </div>
        <div className="main-form">
          <Form setValidatedData={setValidatedData}/>
        </div>
        <div className="main-btn-group">
          <Button label={"동의하고 간편인증하기"} role={'validate'} disabled={!validated} clickFunc={showModal}></Button>
        </div>
      </div>
      {/* 약관 동의 모달 */}
      <Modal role={`main`} visible={isVisible} setVisible={setIsVisible}>
        <>
          <MainModal allChecked={allChecked} setAllChecked={setAllChecked}/>
          <div className="main-modal-btn-group">
            <Button label={"동의하고 간편인증하기"} role={'auth'} disabled={!allChecked} clickFunc={goProgress}></Button>
          </div>
        </>
      </Modal>
    </section>
  );
}

export default Main;
