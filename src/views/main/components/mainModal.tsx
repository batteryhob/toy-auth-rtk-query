import { useEffect, useState } from "react";
import Checkbox from "../../../shared/checkbox";


interface MainModalProps {
    allChecked: boolean;
    setAllChecked: (checked: boolean) => void;
}

/*
    메인창에서 동의를 얻는 모달
    역할: 모든 동의를 얻었는지 벨리데이션
*/
function MainModal({
    allChecked,
    setAllChecked
}: MainModalProps) {

  //state
  const [checked, setChecked] = useState<boolean>(false);
  const [serviceChecked, setServiceChecked] = useState<boolean>(false);
  const [identifyChecked, setIdentifyChecked] = useState<boolean>(false);
  const [thirdChecked, setThirdChecked] = useState<boolean>(false);

  useEffect(()=>{
    if(checked && serviceChecked && identifyChecked && thirdChecked){
      setAllChecked(true);
    }else{
      setAllChecked(false);
    }
  },[checked, serviceChecked, identifyChecked, thirdChecked, setAllChecked]);

  //핸들러
  function handleAllChecked(value: boolean){
    setAllChecked(value);
    setChecked(value);
    setServiceChecked(value);
    setIdentifyChecked(value);
    setThirdChecked(value);
  }
  function handleChecked(value: boolean){
    setChecked(value);
  }
  function handleServiceChecked(value: boolean){
    setServiceChecked(value);
  }
  function handleIdentifyChecked(value: boolean){
    setIdentifyChecked(value);
  }
  function handleThirdChecked(value: boolean){
    setThirdChecked(value);
  }

  return (
    <>
    <div className="main-modal-all-group">
      <Checkbox label={`약관에 모두 동의`} id={'allChecked'} propValue={allChecked} onChange={handleAllChecked} isAll={true}></Checkbox>
    </div>
    <div className="main-modal-checkbox-group">
      <Checkbox label={`[필수] 개인정보 동의`} id={'checked'} propValue={checked} onChange={handleChecked}></Checkbox>
      <Checkbox label={`[필수] 서비스 이용 약관 동의`} id={'serviceChecked'} propValue={serviceChecked} onChange={handleServiceChecked}></Checkbox>
      <Checkbox label={`[필수] 고유식별정보 처리 동의`} id={'identifyChecked'} propValue={identifyChecked} onChange={handleIdentifyChecked}></Checkbox>
      <Checkbox label={`[필수] 제3자 정보제공 동의`} id={'thirdChecked'} propValue={thirdChecked} onChange={handleThirdChecked}></Checkbox>
    </div>
  </>
  );
}

export default MainModal;
