export interface loginType {
  email: string;
  password: string;
  isFirebaseError: boolean;
}

export interface registerType {
  name: string;
  email: string;
  password: string;
}

export interface todoArrayType {
  id?: string;
  todoName: string;
  todoDescription?: string;
  todoDeadLine?: string;
  isComplete: boolean;
}

export type todoData = {
  name: string;
  todo: todoArrayType[];
};
