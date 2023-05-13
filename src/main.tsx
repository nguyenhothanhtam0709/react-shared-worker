import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { WorkerProvider } from "./contexts/workerContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WorkerProvider>
      <App />
    </WorkerProvider>
  </React.StrictMode>
);
