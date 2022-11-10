import { IsString } from 'class-validator';

export class CreateDialogueDto {
  @IsString()
  public title: string;

  @IsString()
  public description: string;
}
