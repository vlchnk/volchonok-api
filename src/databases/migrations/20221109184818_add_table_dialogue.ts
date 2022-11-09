import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('dialogue', table => {
    table.bigIncrements('id').unsigned().primary();
    table.string('title').notNullable().index();
    table.string('description', 30);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('dialogue');
}
