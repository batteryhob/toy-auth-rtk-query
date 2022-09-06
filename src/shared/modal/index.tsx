import styles from './index.module.scss';

interface ModalProps {
  children: JSX.Element;
  role: string;
  visible: boolean;
  setVisible: (visible: boolean) => void
}

function Modal({children, role, visible, setVisible}: ModalProps) {    

    //바깥 영역을 클릭할 때, 닫힘
    function handleClick(e:any) {
      if(e.target.getAttribute("data-role") === 'background'){
        setVisible(false)
      }
    }

    return (
      <div className={`${styles.customModalWrapper} ${visible? styles.on: ""}`} role={`modal_${role}`} onClick={handleClick} data-role="background">
        <div className={styles.customModal}>
          <div className={styles.customModalInner}>
            { children }
          </div>
        </div>
      </div>
    );
  }
  
  export default Modal;
  