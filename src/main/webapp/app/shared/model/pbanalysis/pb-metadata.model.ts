export interface IPBMetadata {
  id?: number;
  key?: string;
  value?: string;
  analysisId?: number;
}

export class PBMetadata implements IPBMetadata {
  constructor(public id?: number, public key?: string, public value?: string, public analysisId?: number) {}
}
