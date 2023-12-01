// App.tsx
import React, { useState } from "react";
import "./App.css";

export const factorial = (n: number): number => {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
};

const App: React.FC = () => {
  const [input, setInput] = useState<number>(0);
  const [result, setResult] = useState<number | null>(null);
  const [resultMain, setResultMain] = useState<number | null>(null);

  const calculateFactorialMain = () => {
    setResultMain(factorial(input));
  };

  const calculateFactorialWorker = () => {
    // Create a new web worker
    const worker = new Worker(new URL("./worker.ts", import.meta.url));

    // Set up worker message event listener
    worker.onmessage = (event) => {
      setResult(event.data);
      worker.terminate(); // Terminate the worker after use
    };

    // Start the worker
    worker.postMessage(input);
  };

  return (
    <div className="App">
      <h1>Web Worker Demo</h1>
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
        Calculate Factorial (Main Thread)
      </button>
      <div>Main Thread Result: {resultMain}</div>
      <br />
      <br />
      <br />
      <br />
      <button onClick={calculateFactorialWorker}>
        Calculate Factorial (Web Worker)
      </button>
      <div>Web Worker Result: {result}</div>
    </div>
  );
};

export default App;
