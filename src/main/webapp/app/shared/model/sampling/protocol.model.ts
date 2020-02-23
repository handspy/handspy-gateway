export interface IProtocol {
  id?: number;
  layout?: number;
  device?: number;
  pageNumber?: number;
  sampleId?: number;
}

export class Protocol implements IProtocol {
  constructor(public id?: number, public layout?: number, public device?: number, public pageNumber?: number, public sampleId?: number) {}
}
