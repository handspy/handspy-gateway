import { IParticipant } from 'app/shared/model/project/participant.model';
import { ITask } from 'app/shared/model/project/task.model';

export interface ILabel {
  id?: number;
  name?: string;
  color?: string;
  projectId?: number;
  participants?: IParticipant[];
  tasks?: ITask[];
}

export class Label implements ILabel {
  constructor(
    public id?: number,
    public name?: string,
    public color?: string,
    public projectId?: number,
    public participants?: IParticipant[],
    public tasks?: ITask[]
  ) {}
}
