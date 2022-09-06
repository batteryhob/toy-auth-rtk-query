import { useRef, useState } from "react";
import styles from "./index.module.scss";

interface InputProps {
  label?: string;
  error?: boolean;
  errorMessage?: string;
  propRef?: any;
  propBirthValue: string;
  propBackNumberValue: string;
  onBirthChange: (value: string) => void;
  onBackNumberChange: (value: string) => void;
}

function ResidentNumberInput({ label, error, errorMessage, propRef, propBirthValue, propBackNumberValue, onBirthChange, onBackNumberChange }: InputProps) {

  const backNumberRef = useRef<HTMLInputElement>(null);
  
  const [ focusedBirth, setFocusedBirth ] = useState(false);
  const [ focusedBackNumber, setFocusedBackNumber ] = useState(false);

  function handleBirthChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value;
    value = value.toString().replace(/[^-0-9]/g,'');
    value = value.substring(0, 6);
    onBirthChange(value);
    if(value.length === 6){
      backNumberRef.current?.focus();
    }
  }
  function handleBackNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value;
    value = value.toString().replace(/[^-0-9]/g,'');
    value = value.substring(0, 7);
    onBackNumberChange(value);
  }
  function handleBirthFocus(){
    setFocusedBirth(true)
  }
  function handleBirthBlur(){
    setFocusedBirth(false)
  }
  function handleBackNumberFocus(){
    setFocusedBackNumber(true)
  }
  function handleBackNumberBlur(){
    setFocusedBackNumber(false)
  }
  
  return (
    <div className={`${styles.customInput} ${propBirthValue.length > 0 && propBackNumberValue.length > 0 && error ? styles.customInputError : ""}`}>
      {label && <div className={styles.customInputLabel}>{label}</div>}
      <div className={styles.customInputContentMulti}>
        <div className={`${styles.customInputContent} ${focusedBirth ? styles.focused : ""}`}>
          <input type="text" role="input_birth" ref={propRef} onChange={handleBirthChange} onFocus={handleBirthFocus} onBlur={handleBirthBlur} value={propBirthValue} />
        </div>
        <div className={styles.hyphen}></div>
        <div className={`${styles.customInputContent} ${focusedBackNumber ? styles.focused : ""}`}>
          <input type="password" role="input_backnumber" ref={backNumberRef} onChange={handleBackNumberChange} onFocus={handleBackNumberFocus} onBlur={handleBackNumberBlur} value={propBackNumberValue} />
        </div>
      </div>
      {
        propBirthValue.length > 0 && propBackNumberValue.length > 0 && error &&
        <div className={styles.customInputSub}>
          {
            errorMessage ? errorMessage : `올바른 ${label}을 입력하세요.`
          }
        </div>
      }
    </div>
  );
}

export default ResidentNumberInput;
