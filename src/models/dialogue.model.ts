import { Model, ModelObject } from 'objection';
import { Dialogue } from '@interfaces/dialogue.interface';

export class DialogueModel extends Model implements Dialogue {
  id!: number;
  title!: string;
  description: string;

  static tableName = 'dialogue'; // database table name
  static idColumn = 'id'; // id column name
}

export type DialogueShape = ModelObject<DialogueModel>;
