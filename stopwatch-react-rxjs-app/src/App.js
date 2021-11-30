import React, {useState, useEffect} from "react";
import  './styles/style.css'
import Timer from "./components/Timer";
import {interval, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators'

function App() {
    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false);

    useEffect(() => {

        const unsub$ = new Subject();
            interval(1000)
            .pipe(takeUntil(unsub$))
            .subscribe(() => {
                if(timerOn){
                    setTime(value => value + 1)
                }
            });
        return () => {
            unsub$.next();
            unsub$.complete();
        };
    },[timerOn]) ;

    const start = () => {
        setTimerOn(true);
    }

    const stop = () => {
        if(time || timerOn){
            setTimerOn(false);
            setTime(0);
        }
    }
    const doubleClick = () => {
        setTimerOn(false);
    }
    const wait = () => {
        if(time > 0) {
            setTimerOn(true);
        }
    }

    const reset = () => {
        setTime(0);
    }

  return (
    <div className="Main">
          <h1>StopWatch</h1>
        <div className="timer">
            <Timer time={time}/>
        </div>
          <div>
              <button  className="btn btn-primary btn-sm" onClick={start}>
                Start
              </button>
              <button  className="btn btn-warning btn-sm" onClick={stop}>
                  Stop
              </button>
              <button  className="btn btn-success btn-sm"
                       onDoubleClick={doubleClick} onClick={wait}>
                  Wait
              </button>
              <button  className="btn btn-danger btn-sm" onClick={reset}>
                  Reset
              </button>
          </div>
    </div>
  );
}

export default App;
