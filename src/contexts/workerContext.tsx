import { FC, PropsWithChildren, createContext } from "react";

const worker: SharedWorker = new SharedWorker(
  new URL("../workers/worker.ts", import.meta.url),
  {
    type: "module",
  }
);

export const WorkerContext = createContext<SharedWorker>(worker);

export const WorkerProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <WorkerContext.Provider value={worker}>{children}</WorkerContext.Provider>
  );
};
