export interface INote {
  id?: number;
  text?: string;
  self?: boolean;
  sampleId?: number;
}

export class Note implements INote {
  constructor(public id?: number, public text?: string, public self?: boolean, public sampleId?: number) {
    this.self = this.self || false;
  }
}
