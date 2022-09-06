import { useEffect, useRef, useState } from "react";

import Input from "../../../shared/input";
import ResidentNumberInput from "../../../shared/input/input.residentNumber";

import {validateName, validatePhoneNumber, validateFullRegNo} from "../../../utils/validationUtil";

import { ValidatedData } from ".."; 
import { useAppSelector } from "../../../app/hooks";
import { getRegisterState } from "../../../features/registerSlice";

interface FormProps {
  setValidatedData: (validatedData: ValidatedData) => void;
}

/*
  메인창에서 정보를 입력받는 폼
  역할: 입력 정보의 벨리데이션
*/
function Form({
  setValidatedData
}: FormProps) {

  const { data } = useAppSelector(getRegisterState);

  useEffect(()=>{
    setName(data.name);
    setPhoneNumber(data.phoneNumber);
    setBirth(data.regNumber.substring(0, 6));
  }, [data]);

  // state
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [birth, setBirth] = useState<string>("");
  const [backNumber, setBackNumber] = useState<string>("");

  const [nameValidate, setNameValidate] = useState<boolean>(false);
  const [phoneNumberValidate, setPhoneNumberValidate] = useState<boolean>(false);
  const [regNoValidate, setRegNoValidate] = useState<boolean>(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const regRef = useRef<HTMLInputElement>(null);

  //첫번째 항목에 focus
  useEffect(()=>{
    nameRef.current?.focus();
  },[]);

  //validation 체크
  useEffect(()=>{
    setNameValidate(validateName(name));
  },[name]);

  useEffect(()=>{ 
    setPhoneNumberValidate(validatePhoneNumber(phoneNumber));
  },[phoneNumber]);

  useEffect(()=>{
    setRegNoValidate(validateFullRegNo(`${birth}${backNumber}`));
  },[birth, backNumber]);

  useEffect(()=>{
    setRegNoValidate(validateFullRegNo(`${birth}${backNumber}`));
  },[birth, backNumber]);

  //모든 validation 항목 체크
  useEffect(()=>{

    if(nameValidate && phoneNumberValidate && regNoValidate){
      setValidatedData({
        validated: true,
        name: name,
        phoneNumber: phoneNumber,
        regNumber: `${birth}${backNumber}`
      });
    }else{
      setValidatedData({
        validated: false
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[nameValidate, phoneNumberValidate, regNoValidate, setValidatedData]);

  //핸들러
  function nameChange(value: string) {
    setName(value);
  }
  function phoneNumberChange(value: string) {
    setPhoneNumber(value);
  }
  function birthChange(value: string) {
    setBirth(value);
  }
  function backNumberChange(value: string) {
    setBackNumber(value);
  }

  function enterName(){
    phoneRef.current?.focus();
  }
  function enterPhone(){
    regRef.current?.focus();
  }

  return (
    <form action="submit">
      <Input
        label="이름"
        role="name"
        error={!nameValidate}
        tip="닉네임이 아닌 실명인지 확인해주세요."
        propValue={name}
        onChange={nameChange}
        propRef={nameRef}
        maxLength={50}
        enterFunc={enterName}
      />
      <Input 
        label="휴대폰 번호"
        role="phone"
        error={!phoneNumberValidate}
        isNumber={true}
        propValue={phoneNumber} 
        onChange={phoneNumberChange} 
        propRef={phoneRef}
        enterFunc={enterPhone}
      />
      <ResidentNumberInput
        label="주민등록번호"
        error={!regNoValidate}
        propBirthValue={birth}
        propBackNumberValue={backNumber}
        onBirthChange={birthChange}
        onBackNumberChange={backNumberChange}
        propRef={regRef}
      />
    </form>
  );
}

export default Form;
