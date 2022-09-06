import { useCallback, useEffect, useState } from "react";
import styles from "./timer.module.scss";

interface TimerProps {
  propSeconds: number;
  setIsExpired: (isExpired: boolean) => void
}

/*
  타이머
  역할: Prop된 시간을 0까지 진행, 만료여부 알려줌.
*/
function Timer({ propSeconds, setIsExpired }: TimerProps) {

  const [second, setSecond] = useState<number>(0);

  const [min, setMin] = useState<number>(0);
  const [sec, setSec] = useState<number>(0);

  const [isBusy, setIsBusy] = useState<boolean>(false);

  useEffect(() => {
    setSecond(propSeconds);
  }, [propSeconds]);

  useEffect(() => {    
    function tick() {
      if(second > 0){
        setSecond(second - 1);
      }
    }
    const id = setInterval(tick, 1000);
    return () => {
      clearInterval(id);
    };
  });

  //매초 실행되는 함수, 재사용을 위해 useCallback을 사용.
  const changeSecond = useCallback(()=>{
    //10초 남았을 때,
    if(second <= 10){
      setIsBusy(true);
    }else{
      setIsBusy(false);
    }

    //만료 시
    if(second === 0){
      setIsExpired(true);
    }else{
      setIsExpired(false);
    }

    const min = Math.floor(second / 60);
    const sec = second % 60;

    setMin(min);
    setSec(sec);
  }, [second, setIsBusy, setIsExpired]);

  useEffect(() => {
    changeSecond();
  }, [second, changeSecond]);

  return (
    <div className={`${styles.timerWrapper} ${isBusy && styles.isBusy}`}>
      <div className={styles.timer}>
        {
          isBusy ?
          <img src="/imgs/ico_timer_red.svg" alt="타이머" /> :
          <img src="/imgs/ico_timer.svg" alt="타이머" />
        }
        <span>{`${min < 10 ? `0${min}`: min}:${sec < 10 ? `0${sec}`: sec}`}</span>
      </div>
    </div>
  );
}

export default Timer;
