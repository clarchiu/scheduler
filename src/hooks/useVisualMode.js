import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 

  const popHistory = () => setHistory(prev => [...prev.slice(0, prev.length - 1)]);

  const transition = (next, replace = false) => {
    if (replace) {
      popHistory();
    }
    setMode(next);
    setHistory(prev => [...prev, next]);
  };

  const back = () => {
    if (history.length === 1) {
      return;
    }
    setMode(history[history.length - 2]);
    popHistory();
  }

  return {
    mode,
    transition,
    back,
  };
}