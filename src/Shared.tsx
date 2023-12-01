// App.tsx
import React, { useState } from "react";
import "./App.css";

const Shared: React.FC = () => {
  const [input, setInput] = useState<number>(0);
  const [result, setResult] = useState<Int16Array | null>(null);

  const updateWorker = () => {
    const newWorker = new Worker(new URL("./sharedWorker.ts", import.meta.url));
    const buffMemLength = new ArrayBuffer(10); //byte length
    // const buffMemLength = new SharedArrayBuffer(1024); // will not work unless cors isolation is done
    let typedArr = new Int16Array(buffMemLength);
    //original data
    typedArr[0] = 20;
    //sending the buffer to worker
    newWorker.postMessage(buffMemLength);

    //onmessage event
    newWorker.onmessage = (e) => {
      console.group("[the main thread]");
      console.log("Data updated from the worker thread: %i", typedArr[0]);
      setResult(typedArr);
      console.groupEnd();
    };
  };

  return (
    <div className="App">
      <h1>Shared Worker Demo</h1>
      <label>
        Enter a number: asdf
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(Number(e.target.value))}
        />
      </label>
      <br />
      <br />
      <br />
      <button onClick={updateWorker}>Update</button>

      <div>Web Worker Result: {result}</div>
    </div>
  );
};

export default Shared;
