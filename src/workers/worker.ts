let count = 0;

self.onconnect = (e: MessageEvent) => {
  const port = e.ports[0];

  port.addEventListener("message", (e) => {
    console.log(`Receive from UI: ${e.data}`);
    count = count + 1;
    port.postMessage(count);
  });

  port.start();
};
