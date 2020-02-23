import { Moment } from 'moment';
import { ILabel } from 'app/shared/model/project/label.model';
import { Gender } from 'app/shared/model/enumerations/gender.model';
import { HandwritingMeans } from 'app/shared/model/enumerations/handwriting-means.model';

export interface IParticipant {
  id?: number;
  name?: string;
  gender?: Gender;
  birthdate?: Moment;
  handedness?: HandwritingMeans;
  additionalInfo?: string;
  imageContentType?: string;
  image?: any;
  projectId?: number;
  labels?: ILabel[];
}

export class Participant implements IParticipant {
  constructor(
    public id?: number,
    public name?: string,
    public gender?: Gender,
    public birthdate?: Moment,
    public handedness?: HandwritingMeans,
    public additionalInfo?: string,
    public imageContentType?: string,
    public image?: any,
    public projectId?: number,
    public labels?: ILabel[]
  ) {}
}
