import { Model, ModelObject } from 'objection';
import { User } from '@interfaces/users.interface';

export class UsersModel extends Model implements User {
  id!: number;
  email!: string;
  name!: string;
  password!: string;

  static tableName = 'users'; // database table name
  static idColumn = 'id'; // id column name
}

export type UsersShape = ModelObject<UsersModel>;
