import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('progress', table => {
    table.bigIncrements('id').unsigned().primary();
    table.string('type').notNullable().index();
    table.bigInteger('dialogue_id').notNullable().index();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('progress');
}
