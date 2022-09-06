import styles from './index.module.scss';

interface ButtonProps {
    label: string;
    role?: string;
    disabled: boolean;
    clickFunc: ()=> void;
}

function Button({label, role, disabled, clickFunc}: ButtonProps) {    
    function handleClick(){
        if(!disabled)
            clickFunc();
    }

    return (
      <div className={`${styles.customBtnWrapper} ${disabled? styles.disabled: ""}`}>
        <button className={`${styles.customBtn} ${disabled? styles.disabled: ""}`} role={`btn_${role}`} type="button" onClick={handleClick}>
          {label}
        </button>
      </div>
    );
  }
  
  export default Button;
  