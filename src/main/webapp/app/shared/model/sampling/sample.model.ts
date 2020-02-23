import { Moment } from 'moment';

export interface ISample {
  id?: number;
  task?: number;
  participant?: number;
  timestamp?: Moment;
  language?: string;
}

export class Sample implements ISample {
  constructor(public id?: number, public task?: number, public participant?: number, public timestamp?: Moment, public language?: string) {}
}
