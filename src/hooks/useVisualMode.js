import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 

  const transition = (next, replace = false) => {
    if (replace) {
      history.pop();
    }
    setMode(next);
    history.push(next);
    setHistory(history);
  };

  const back = () => {
    if (history.length === 1) {
      return;
    }
    history.pop();
    setHistory(history);
    setMode(history[history.length - 1]);

  }

  return {
    mode,
    transition,
    back,
  };
}