export interface IAnnotation {
  id?: number;
  type?: number;
  start?: number;
  size?: number;
  note?: string;
  textId?: number;
}

export class Annotation implements IAnnotation {
  constructor(
    public id?: number,
    public type?: number,
    public start?: number,
    public size?: number,
    public note?: string,
    public textId?: number
  ) {}
}
