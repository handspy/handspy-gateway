export interface IAnnotationType {
  id?: number;
  name?: string;
  label?: string;
  description?: string;
  emotional?: boolean;
  weight?: number;
  color?: string;
}

export class AnnotationType implements IAnnotationType {
  constructor(
    public id?: number,
    public name?: string,
    public label?: string,
    public description?: string,
    public emotional?: boolean,
    public weight?: number,
    public color?: string
  ) {
    this.emotional = this.emotional || false;
  }
}
