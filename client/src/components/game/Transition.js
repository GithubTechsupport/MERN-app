import React, { useEffect, useState, useRef } from "react";

export default function Transition(props) {
  const Ref = useRef(null);
  const totalTime = useRef(props.data.transitionDuration);
  const [progress, setProgress] = useState(100);
  const [timer, setTimer] = useState(totalTime.current);

  const getTimeRemaining = (e) => {
      const msLeft = Date.parse(e) - Date.now();
      return {
          msLeft,
      };
  };

  const startTimer = (e) => {
      let { msLeft } = getTimeRemaining(e);
      if (msLeft >= 0) {
          // update the timer
          // check if less than 10 then we need to
          // add '0' at the beginning of the variable
          setProgress(msLeft / (totalTime.current * 1000) * 100);
          setTimer(Math.floor(msLeft / 1000));
      }
  };

  useEffect(() => {console.log(progress)}, [progress])

  const clearTimer = (e) => {
      // If you adjust it you should also need to
      // adjust the Endtime formula we are about
      // to code next
      setTimer(totalTime.current);

      // If you try to remove this line the
      // updating of timer Variable will be
      // after 1000ms or 1sec
      if (Ref.current) clearInterval(Ref.current);
      const id = setInterval(() => {
          startTimer(e);
      }, 100);
      Ref.current = id;
  };

  const getDeadTime = () => {
      let deadline = new Date();
      deadline.setSeconds(deadline.getSeconds() + totalTime.current);
      return deadline;
  };

  // We can use useEffect so that when the component
  // mount the timer will start as soon as possible

  // We put empty array to act as componentDid
  // mount only
  useEffect(() => {
      clearTimer(getDeadTime());
  }, []);

  // Another way to call the clearTimer() to start
  // the countdown is via action event from the
  // button first we create function to be called
  // by the button
  const onClickReset = () => {
      clearTimer(getDeadTime());
  };

  return (
    <div style={{ textAlign: "center", margin: "auto" }}>
        <div className="radial-progress" style={{"--value":progress}} role="progressbar">{timer}</div>
    </div>
  );

}