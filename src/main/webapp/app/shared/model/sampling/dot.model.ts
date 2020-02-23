import { Moment } from 'moment';
import { DotType } from 'app/shared/model/enumerations/dot-type.model';

export interface IDot {
  id?: number;
  timestamp?: Moment;
  x?: number;
  y?: number;
  type?: DotType;
  tiltX?: number;
  tiltY?: number;
  twist?: number;
  pressure?: number;
  protocolId?: number;
}

export class Dot implements IDot {
  constructor(
    public id?: number,
    public timestamp?: Moment,
    public x?: number,
    public y?: number,
    public type?: DotType,
    public tiltX?: number,
    public tiltY?: number,
    public twist?: number,
    public pressure?: number,
    public protocolId?: number
  ) {}
}
