import { useState } from "react";
import styles from "./index.module.scss";

interface InputProps {
  label?: string;
  role?: string;
  tip?: string;
  error?: boolean;
  errorMessage?: string;
  isNumber?: boolean
  propRef?: any;
  maxLength?: number;
  enterFunc?: () => void;
  propValue: string;
  onChange: (value: string) => void;
}

function Input({ label, role, tip, error, errorMessage, isNumber, propRef, maxLength, enterFunc, propValue, onChange }: InputProps) {

  const [ focused, setFocused ] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value;
    if(isNumber)
     value = value.toString().replace(/[^-0-9]/g,'');
    if(maxLength)
      value = value.substring(0, maxLength);
    value = value.trimStart();
    onChange(value);
  }
  function handleFocus(){
    setFocused(true)
  }
  function handleBlur(){
    setFocused(false)
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>){
    if( e.key === 'Enter' ){
      if(enterFunc){
        enterFunc();
      }
    }
  }

  return (
    <div className={`${styles.customInput} ${propValue.length > 0 && error ? styles.customInputError : ""}`}>
      {label && <div className={styles.customInputLabel}>{label}</div>}
      <div className={`${styles.customInputContent} ${focused ? styles.focused : ""}`}>
        <input type="text" role={`input_${role}`} ref={propRef} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} onKeyPress={handleKeyPress} value={propValue} />
      </div>
      {
        propValue.length > 0 && error ?
        <div className={styles.customInputSub}>
          {
            errorMessage ? errorMessage : `올바른 ${label}을 입력하세요.`
          }
        </div>
        :
        <div className={styles.customInputSub}>
          {tip && <p><span>TIP</span>{tip}</p>}
        </div>
      }
    </div>
  );
}

export default Input;
