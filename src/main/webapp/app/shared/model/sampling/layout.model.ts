export interface ILayout {
  id?: number;
  name?: string;
  description?: string;
  width?: number;
  height?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  url?: string;
}

export class Layout implements ILayout {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public width?: number,
    public height?: number,
    public marginLeft?: number,
    public marginRight?: number,
    public marginTop?: number,
    public marginBottom?: number,
    public url?: string
  ) {}
}
