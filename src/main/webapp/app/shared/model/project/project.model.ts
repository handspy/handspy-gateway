import { Moment } from 'moment';
import { ProjectStatus } from 'app/shared/model/enumerations/project-status.model';

export interface IProject {
  id?: number;
  name?: string;
  description?: string;
  imageContentType?: string;
  image?: any;
  startDate?: Moment;
  endDate?: Moment;
  status?: ProjectStatus;
  owner?: number;
}

export class Project implements IProject {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public imageContentType?: string,
    public image?: any,
    public startDate?: Moment,
    public endDate?: Moment,
    public status?: ProjectStatus,
    public owner?: number
  ) {}
}
