import { NextFunction, Request, Response } from 'express';
import { CreateDialogueDto } from '@dtos/dialogue.dto';
import { Dialogue } from '@interfaces/dialogue.interface';
import DialogueService from '@services/dialogue.service';

class DialogueController {
  public dialogueService = new DialogueService();

  public getDialogues = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllUsersData: Dialogue[] = await this.dialogueService.findAllDialogue();

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getDialogueById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const DialogueId = Number(req.params.id);
      const findOneDialogueData: Dialogue = await this.dialogueService.findDialogueById(DialogueId);

      res.status(200).json({ data: findOneDialogueData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createDialogue = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const DialogueData: CreateDialogueDto = req.body;
      const createDialogueData: Dialogue = await this.dialogueService.createDialogue(DialogueData);

      res.status(201).json({ data: createDialogueData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateDialogue = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const DialogueId = Number(req.params.id);
      const DialogueData: Dialogue = req.body;
      const updateDialogueData: Dialogue = await this.dialogueService.updateDialogue(DialogueId, DialogueData);

      res.status(200).json({ data: updateDialogueData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteDialogue = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const DialogueId = Number(req.params.id);
      const deleteDialogueData: Dialogue = await this.dialogueService.deleteDialogue(DialogueId);

      res.status(200).json({ data: deleteDialogueData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default DialogueController;
