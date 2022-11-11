import { Knex } from 'knex';
import { DIALOGUE_FLOW_TYPE } from '../../constants';

export async function up(knex: Knex): Promise<void> {
  const [{ id: dialogue_id }] = await knex('dialogue')
    .insert({
      title: 'Weather',
      description: 'Small talk about weather',
    })
    .returning('id');

  await knex('dialogue_flow').insert([
    { dialogue_id, queue: 0, type: DIALOGUE_FLOW_TYPE.QUESTION, text: `It's an ugly day today.`, ru_translate: 'Сегодня плохой день.' },
    {
      dialogue_id,
      queue: 1,
      type: DIALOGUE_FLOW_TYPE.ANSWER,
      text: `I know. I think it may rain.`,
      ru_translate: 'Я знаю. Я думаю, может пойти дождь.',
    },
    {
      dialogue_id,
      queue: 2,
      type: DIALOGUE_FLOW_TYPE.QUESTION,
      text: `It's the middle of summer, it shouldn't rain today.`,
      ru_translate: 'Сейчас середина лета, сегодня не должно быть дождя.',
    },
    { dialogue_id, queue: 3, type: DIALOGUE_FLOW_TYPE.ANSWER, text: `That would be weird.`, ru_translate: 'Это было бы странно.' },
    {
      dialogue_id,
      queue: 4,
      type: DIALOGUE_FLOW_TYPE.QUESTION,
      text: `Yeah, especially since it's ninety degrees outside.`,
      ru_translate: 'Да, тем более, что на улице девяносто градусов.',
    },
    {
      dialogue_id,
      queue: 5,
      type: DIALOGUE_FLOW_TYPE.ANSWER,
      text: `I know, it would be horrible if it rained and it was hot outside.`,
      ru_translate: 'Я знаю, было бы ужасно, если бы шел дождь и было бы жарко на улице.',
    },
    { dialogue_id, queue: 6, type: DIALOGUE_FLOW_TYPE.QUESTION, text: `Yes, it would be.`, ru_translate: 'Да, было бы.' },
    {
      dialogue_id,
      queue: 7,
      type: DIALOGUE_FLOW_TYPE.ANSWER,
      text: `I really wish it wasn't so hot every day.`,
      ru_translate: 'Мне бы очень хотелось, чтобы не было так жарко каждый день.',
    },
    {
      dialogue_id,
      queue: 8,
      type: DIALOGUE_FLOW_TYPE.QUESTION,
      text: `Me too. I can't wait until winter.`,
      ru_translate: 'Я тоже. Я не могу дождаться зимы.',
    },
    {
      dialogue_id,
      queue: 9,
      type: DIALOGUE_FLOW_TYPE.ANSWER,
      text: `I like winter too, but sometimes it gets too cold.`,
      ru_translate: 'Я тоже люблю зиму, но иногда бывает слишком холодно.',
    },
    {
      dialogue_id,
      queue: 10,
      type: DIALOGUE_FLOW_TYPE.QUESTION,
      text: `I'd rather be cold than hot.`,
      ru_translate: 'Я предпочитаю быть холодным, чем горячим.',
    },
    { dialogue_id, queue: 12, type: DIALOGUE_FLOW_TYPE.ANSWER, text: `Me too.`, ru_translate: 'Я тоже.' },
  ]);
}

export async function down(knex: Knex): Promise<void> {
  const { id } = await knex('dialogue').select().where('title', '=', 'Weather').first();

  await knex('dialogue_flow').delete().where('dialogue_id', '=', id);
  await knex('dialogue').delete().where('id', '=', id);
}
