import { useMemo, useState } from "react";

function App() {
  const worker: SharedWorker = useMemo(
    () => new SharedWorker(new URL("./workers/worker.ts", import.meta.url)),
    []
  );

  const [str, setStr] = useState("");

  worker.port.onmessage = (e: MessageEvent<string>) => {
    if (e.data) {
      setStr(`Receive from Worker: ${e.data} on ${Date.now()}`);
    }
  };

  return (
    <>
      <div>{str}</div>

      <button onClick={() => worker.port.postMessage(Date.now())}>Hello</button>
    </>
  );
}

export default App;
