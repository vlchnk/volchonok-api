export interface User {
  id: number;
  dialogue_id: number;
  queue: number;
  question: string;
  translate: string;
  answer: string[];
}
