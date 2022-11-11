import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('dialogue_flow', table => {
    table.bigIncrements('id').unsigned().primary();
    table.bigInteger('dialogue_id').notNullable().index();
    table.integer('queue').notNullable();
    table.string('type').notNullable();
    table.string('text').notNullable();
    table.string('ru_translate').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('dialogue_flow');
}
