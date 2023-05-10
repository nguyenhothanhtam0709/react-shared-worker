import Dexie, { Table } from "dexie";
import { Command, EventData, Todo } from "../commons/todo";

console.log("start shared worker");

const DB_NAME = "db_local";

class TodoDB extends Dexie {
  public readonly todos!: Table<Omit<Todo, "id">, number>;

  constructor() {
    super(DB_NAME);
    this.version(1).stores({
      todos: "++id, title, content",
    });
  }
}

const db = new TodoDB();

db.todos.count().then((count) => {
  if (!count) {
    db.todos.bulkAdd([
      {
        title: "title 1",
        content: "content 1",
      },
      {
        title: "title 2",
        content: "content 2",
      },
      {
        title: "title 3",
        content: "content 3",
      },
    ]);
  }
});

self.onconnect = (e: MessageEvent) => {
  const port = e.ports[0];

  port.addEventListener("message", (e: MessageEvent<EventData>) => {
    switch (e.data.cmd) {
      case Command.GET_TODOS:
        db.todos.toArray().then((value) => {
          port.postMessage({
            cmd: Command.GET_TODOS,
            data: value,
          });
        });
        break;

      case Command.CREATE_TODO:
        db.todos.add(e.data.data as any).then(() => {
          port.postMessage({
            cmd: Command.MESSAGE,
            data: "Create todo complete!",
          });
        });
        break;
    }
  });

  port.start();
};
