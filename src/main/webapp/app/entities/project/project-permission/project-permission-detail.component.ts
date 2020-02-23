import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProjectPermission } from 'app/shared/model/project/project-permission.model';

@Component({
  selector: 'hs-project-permission-detail',
  templateUrl: './project-permission-detail.component.html'
})
export class ProjectPermissionDetailComponent implements OnInit {
  projectPermission: IProjectPermission | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ projectPermission }) => (this.projectPermission = projectPermission));
  }

  previousState(): void {
    window.history.back();
  }
}
