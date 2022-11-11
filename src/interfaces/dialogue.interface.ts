import { DialogueFlow } from './dialogue-flow.interface';

export interface Dialogue {
  id: number;
  title: string;
  description: string;

  dialogue_flow?: DialogueFlow[];
}
