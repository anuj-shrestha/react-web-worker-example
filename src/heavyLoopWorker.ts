import { heavyLoop } from "./HeavyLoop";

/* eslint-disable no-restricted-globals */
self.onmessage = (event) => {
  const { data } = event;
  let result = heavyLoop(data);
  self.postMessage(result);
};
export {};
