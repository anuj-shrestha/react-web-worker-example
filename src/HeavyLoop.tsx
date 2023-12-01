// App.tsx
import React, { useState } from "react";
import "./App.css";

export const heavyLoop = (n: number): number => {
  let result = 0;
  for (let i = 0; i < 2000000000; i++) {
    result = result + i;
  }
  return result;
};

const HeavyLoop: React.FC = () => {
  const [input, setInput] = useState<number>(0);
  const [counter, setCounter] = useState<number>(0);
  const [result, setResult] = useState<number | null>(null);
  const [resultMain, setResultMain] = useState<number | null>(null);
  const [loadingWorker, setLoadingWorker] = useState<boolean>(false);

  const calculateFactorialMain = () => {
    setResultMain(heavyLoop(input));
  };

  const calculateFactorialWorker = () => {
    // Create a new web worker
    setLoadingWorker(true);

    const worker = new Worker(new URL("./heavyLoopWorker.ts", import.meta.url));

    // Set up worker message event listener
    worker.onmessage = (event) => {
      setResult(event.data);
      worker.terminate(); // Terminate the worker after use
      setLoadingWorker(false);
    };

    // Start the worker
    worker.postMessage(input);
  };

  return (
    <div className="App">
      <h1>Web Worker Demo</h1>
      <h2>Counter: {counter}</h2>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
      <br />
      <br />
      <br />
      <br />
      <label>
        Enter a number:
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(Number(e.target.value))}
        />
      </label>
      <br />
      <br />
      <br />
      <button onClick={calculateFactorialMain}>
        Calculate Heavy Loop (Main Thread)
      </button>
      <div>Main Thread Result: {resultMain}</div>
      <br />
      <br />
      <br />
      <br />
      <button onClick={calculateFactorialWorker}>
        Calculate Heavy Loop (Web Worker)
      </button>
      {loadingWorker ? (
        <div>Loading...</div>
      ) : (
        <div>Web Worker Result: {result}</div>
      )}
    </div>
  );
};

export default HeavyLoop;
