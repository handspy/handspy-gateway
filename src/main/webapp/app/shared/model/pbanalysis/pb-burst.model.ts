export interface IPBBurst {
  id?: number;
  duration?: number;
  pauseDuration?: number;
  startX?: number;
  startY?: number;
  endX?: number;
  endY?: number;
  distance?: number;
  avgSpeed?: number;
  text?: string;
  analysisId?: number;
}

export class PBBurst implements IPBBurst {
  constructor(
    public id?: number,
    public duration?: number,
    public pauseDuration?: number,
    public startX?: number,
    public startY?: number,
    public endX?: number,
    public endY?: number,
    public distance?: number,
    public avgSpeed?: number,
    public text?: string,
    public analysisId?: number
  ) {}
}
