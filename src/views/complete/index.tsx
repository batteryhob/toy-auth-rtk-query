import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { getRegisterState } from "../../features/registerSlice";
import { useGetTaxOfficeQuery, useGetTaxQuery } from "../../services/taxApi";

import "./index.scss";

/*
  완료 뷰
*/
function Complete() {

    const { data: registerData, status} = useAppSelector(getRegisterState);
    //rtk-query

    const { data: tax, isSuccess: isTaxSuccess } = useGetTaxQuery(undefined);
    const { data: taxOffice, isSuccess: isTaxOfficeSuccess } = useGetTaxOfficeQuery(undefined);

    //완료 상태가 아니면, return
    if(status !== 'completed'){
      return <Navigate to="/" replace />;
    }

    if(!isTaxSuccess || !isTaxOfficeSuccess){
      return  <>로딩중...</>
    }

    return (
      <section className="complete">
        <div className="complete-wrapper">
          <div className="complete-header">
            <div>
              <img src="/imgs/ico_complete.svg" alt="완료" />
            </div>            
            <h1>인증완료</h1>
            <h2>본인인증이 완료되었습니다.</h2>            
          </div>
          <div className="complete-infomation blue">
            <ul>
              <li>
                  <div className="complete-infomation-item">
                    <div>기본 정보</div>
                  </div>
              </li>
              <li>
                  <div className="complete-infomation-item">
                    <div>이름</div>
                    <div>{registerData.name}</div>
                  </div>
              </li>
              <li>
                  <div className="complete-infomation-item">
                    <div>휴대폰 번호</div>
                    <div>{registerData.phoneNumber}</div>
                  </div>
              </li>
              <li>
                <div className="complete-infomation-item">
                  <div>주민등록번호</div>
                  <div>{registerData.regNumber}</div>
                </div>
              </li>
            </ul>
          </div>
          <div className="complete-infomation">
              <ul>
                <li>
                    <div className="complete-infomation-item">
                      <div>상세 정보</div>
                    </div>
                </li>
                {
                  tax.data?.tax.incomes.map((income: any, i: number)=>{
                      return (
                        <li key={i}>
                          <div className="complete-infomation-item">
                            <div>{income.type === 'refund' ? `이미 낸 세금` : `돌려받을 세금`}</div>
                            <div>{income.amount}</div>
                          </div>
                        </li>
                      )
                  })
                }
              </ul>
          </div>
          <div className="complete-infomation blue">
              <ul>
                <li>
                    <div className="complete-infomation-item">
                      <div>환급액 입금 안내</div>
                    </div>
                </li>
                <li>
                  <div className="complete-infomation-item">
                    <div>관할세무서</div>
                    <div>{taxOffice.data?.tax.office.name}</div>
                  </div>
                </li>
                <li>
                    <div className="complete-infomation-item">
                      <div>연락처</div>
                      <div>{taxOffice.data?.tax.office.phone}</div>
                    </div>
                </li>
              </ul>
          </div>
        </div>
      </section>
    );
  }
  
  export default Complete;
  