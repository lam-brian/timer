import { useState } from "react";

const TimerInput = (props) => {
  const [minInput, setMinInput] = useState("");
  const [secInput, setSecInput] = useState("");

  const submitFormHandler = (e) => {
    e.preventDefault();
    if (!minInput && !secInput) return;

    props.onSetTimer(minInput, secInput);
    setMinInput("");
    setSecInput("");
  };

  const minuteChangeHandler = (e) => {
    setMinInput(e.target.value);
  };

  const secChangeHandler = (e) => {
    setSecInput(e.target.value);
  };

  return (
    <form onSubmit={submitFormHandler}>
      <label htmlFor="minutes">min</label>
      <input
        type="number"
        id="minutes"
        max={99}
        min={0}
        value={minInput}
        onChange={minuteChangeHandler}
      />
      <label htmlFor="seconds">sec</label>
      <input
        type="number"
        id="seconds"
        max={59}
        min={0}
        value={secInput}
        onChange={secChangeHandler}
      />
      <button>SUBMIT</button>
    </form>
  );
};

export default TimerInput;
