/* eslint-disable no-restricted-globals */
let BYTE_PER_LENTH = 5;

self.onmessage = (event) => {
  const { data } = event;

  let arr = new Int16Array(data);
  console.group("[worker thread]");
  console.log("Data received from main thread: %i", arr[0]);
  console.groupEnd();

  //updating the data from the worker thread
  let dataChanged = 5 * BYTE_PER_LENTH;
  arr[0] = dataChanged; // Will not work correctly since SharedArrayBuffer is not supported in current setup
  //Sending to the main thread
  postMessage("Updated");
};
export {};
