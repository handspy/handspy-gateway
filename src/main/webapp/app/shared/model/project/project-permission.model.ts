export interface IProjectPermission {
  id?: number;
  user?: number;
  permission?: number;
  projectId?: number;
}

export class ProjectPermission implements IProjectPermission {
  constructor(public id?: number, public user?: number, public permission?: number, public projectId?: number) {}
}
