import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('dialogue_flow', table => {
    table.bigIncrements('id').unsigned().primary();
    table.bigInteger('dialogue_id').notNullable().index();
    table.integer('queue').notNullable();
    table.string('question').notNullable();
    table.specificType('answer', 'text[]');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('dialogue_flow');
}
