import { useContext, useState } from "react";
import { Command, EventData, Todo } from "./commons/todo";
import { WorkerContext } from "./contexts/workerContext";

function notifyMe(msg: string) {
  if (Notification.permission === "granted") {
    new Notification(msg);
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification(msg);
      }
    });
  }
}

function App() {
  const worker: SharedWorker = useContext(WorkerContext);

  const [todos, setTodos] = useState<Array<Todo>>([]);

  worker.port.onmessage = (e: MessageEvent<EventData<any>>) => {
    if (e.data) {
      switch (e.data.cmd) {
        case Command.GET_TODOS:
          setTodos(e.data.data as Array<Todo>);
          break;
        case Command.MESSAGE:
          notifyMe(e.data.data as string);
          break;
        case Command.CREATE_TODO:
          setTodos([...todos, e.data.data]);
          break;
        case Command.CLEAR_TODOS:
          setTodos([]);
          break;
      }
    }
  };

  return (
    <>
      <div>
        <h1>List todo</h1>
        <div>
          {todos?.length &&
            todos.map((i) => (
              <div key={i.id}>
                <span>id: {i.id} </span>
                <span>title: {i.title} </span>
                <span>content: {i.content} </span>
              </div>
            ))}
        </div>
      </div>
      <button
        onClick={() =>
          worker.port.postMessage({
            cmd: Command.GET_TODOS,
          })
        }
      >
        Retrieve All
      </button>
      <button
        onClick={() =>
          worker.port.postMessage({
            cmd: Command.CLEAR_TODOS,
          })
        }
      >
        Clear All
      </button>
      <button
        onClick={() =>
          worker.port.postMessage({
            cmd: Command.CREATE_TODO,
            data: {
              title: `Title as ${Date.now()}`,
              content: `Content as ${new Date()}`,
            },
          })
        }
      >
        Create
      </button>
    </>
  );
}

export default App;
