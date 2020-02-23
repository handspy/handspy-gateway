import { Moment } from 'moment';
import { ILabel } from 'app/shared/model/project/label.model';

export interface ITask {
  id?: number;
  name?: string;
  description?: string;
  startDate?: Moment;
  endDate?: Moment;
  projectId?: number;
  labels?: ILabel[];
}

export class Task implements ITask {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public startDate?: Moment,
    public endDate?: Moment,
    public projectId?: number,
    public labels?: ILabel[]
  ) {}
}
