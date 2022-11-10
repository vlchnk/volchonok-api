import { Router } from 'express';
import DialogueController from '@controllers/dialogue.controller';
import { CreateDialogueDto } from '@dtos/dialogue.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class DialogueRoute implements Routes {
  public path = '/dialogue';
  public router = Router();
  public dialogueController = new DialogueController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.dialogueController.getDialogues);
    this.router.get(`${this.path}/:id(\\d+)`, this.dialogueController.getDialogueById);
    this.router.post(`${this.path}`, validationMiddleware(CreateDialogueDto, 'body'), this.dialogueController.createDialogue);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateDialogueDto, 'body', true), this.dialogueController.updateDialogue);
    this.router.delete(`${this.path}/:id(\\d+)`, this.dialogueController.deleteDialogue);
  }
}

export default DialogueRoute;
