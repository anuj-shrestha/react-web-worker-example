(()=>{"use strict";self.onmessage=e=>{const{data:o}=e;let s=new Int16Array(o);console.group("[worker thread]"),console.log("Data received from main thread: %i",s[0]),console.groupEnd();s[0]=25,postMessage("Updated")}})();
//# sourceMappingURL=112.f9237064.chunk.js.map