export interface IText {
  id?: number;
  text?: string;
  sampleId?: number;
}

export class Text implements IText {
  constructor(public id?: number, public text?: string, public sampleId?: number) {}
}
