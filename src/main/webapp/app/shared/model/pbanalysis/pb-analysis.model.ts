export interface IPBAnalysis {
  id?: number;
  sample?: number;
  threshold?: number;
}

export class PBAnalysis implements IPBAnalysis {
  constructor(public id?: number, public sample?: number, public threshold?: number) {}
}
