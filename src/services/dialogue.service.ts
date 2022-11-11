import { CreateDialogueDto } from '@dtos/dialogue.dto';
import { HttpException } from '@exceptions/HttpException';
import { Dialogue } from '@interfaces/dialogue.interface';
import { DialogueModel } from '@models/dialogue.model';
import { isEmpty } from '@utils/util';

class DialogueService {
  public async findAllDialogue(): Promise<Dialogue[]> {
    const dialogueList: Dialogue[] = await DialogueModel.query().select();

    return dialogueList;
  }

  public async findDialogueById(dialogueId: number): Promise<Dialogue> {
    const findDialogue: Dialogue = await DialogueModel.query()
      .leftJoin('dialogue_flow', 'dialogue.id', '=', 'dialogue_flow.dialogue_id')
      .groupBy('dialogue.id')
      .select(DialogueModel.raw(`dialogue.id, dialogue.title, json_agg(dialogue_flow) as dialogue_flow`))
      .where('dialogue.id', '=', dialogueId)
      .first();

    if (!findDialogue) throw new HttpException(409, "Dialogue doesn't exist");

    return findDialogue;
  }

  public async createDialogue(dialogueData: CreateDialogueDto): Promise<Dialogue> {
    if (isEmpty(dialogueData)) throw new HttpException(400, 'dialogueData is empty');

    const findDialogue: Dialogue = await DialogueModel.query().select().from('dialogue').where('title', '=', dialogueData.title).first();
    if (findDialogue) throw new HttpException(409, `This title ${dialogueData.title} already exists`);

    const createDialogueData: Dialogue = await DialogueModel.query().insert(dialogueData);

    return createDialogueData;
  }

  public async updateDialogue(dialogueId: number, dialogueData: Dialogue): Promise<Dialogue> {
    if (isEmpty(dialogueData)) throw new HttpException(400, 'dialogueData is empty');

    const findDialogue: Dialogue = await DialogueModel.query().select().from('dialogue').where('id', '=', dialogueId).first();
    if (!findDialogue) throw new HttpException(409, "Dialogue doesn't exist");

    await DialogueModel.query().update(dialogueData).where('id', '=', dialogueId);

    const updateDialogueData: Dialogue = await DialogueModel.query().select().from('dialogue').where('id', '=', dialogueId).first();

    return updateDialogueData;
  }

  public async deleteDialogue(dialogueId: number): Promise<Dialogue> {
    const findDialogue: Dialogue = await DialogueModel.query().select().from('dialogue').where('id', '=', dialogueId).first();
    if (!findDialogue) throw new HttpException(409, "Dialogue doesn't exist");

    await DialogueModel.query().delete().from('dialogue').where('id', '=', dialogueId);
    return findDialogue;
  }
}

export default DialogueService;
