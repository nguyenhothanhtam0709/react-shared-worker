export interface Todo {
  id: number;
  title: string;
  content: string;
}

export enum Command {
  GET_TODOS = "GET_TODOS",
  CREATE_TODO = "CREATE_TODO",
  MESSAGE = "MESSAGE",
}

export interface EventData<T = undefined> {
  cmd: Command;
  data: T;
}
