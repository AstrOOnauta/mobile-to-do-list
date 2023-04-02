export interface Task {
  id: number;
  title: string;
  description: string;
  isDone: boolean;
  doneAt: Date | null;
  createdAt: Date | null;
}
