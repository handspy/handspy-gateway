import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProjectPermission } from 'app/shared/model/project/project-permission.model';
import { ProjectPermissionService } from './project-permission.service';

@Component({
  templateUrl: './project-permission-delete-dialog.component.html'
})
export class ProjectPermissionDeleteDialogComponent {
  projectPermission?: IProjectPermission;

  constructor(
    protected projectPermissionService: ProjectPermissionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.projectPermissionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('projectPermissionListModification');
      this.activeModal.close();
    });
  }
}
