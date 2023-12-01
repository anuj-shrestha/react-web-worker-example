import { factorial } from "./App";

/* eslint-disable no-restricted-globals */
self.onmessage = (event) => {
  const { data } = event;
  const result = factorial(data);
  self.postMessage(result);
};
export {};
