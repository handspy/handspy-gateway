import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProjectPermission } from 'app/shared/model/project/project-permission.model';
import { ProjectPermissionService } from './project-permission.service';
import { ProjectPermissionDeleteDialogComponent } from './project-permission-delete-dialog.component';

@Component({
  selector: 'hs-project-permission',
  templateUrl: './project-permission.component.html'
})
export class ProjectPermissionComponent implements OnInit, OnDestroy {
  projectPermissions?: IProjectPermission[];
  eventSubscriber?: Subscription;

  constructor(
    protected projectPermissionService: ProjectPermissionService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.projectPermissionService
      .query()
      .subscribe((res: HttpResponse<IProjectPermission[]>) => (this.projectPermissions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProjectPermissions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProjectPermission): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProjectPermissions(): void {
    this.eventSubscriber = this.eventManager.subscribe('projectPermissionListModification', () => this.loadAll());
  }

  delete(projectPermission: IProjectPermission): void {
    const modalRef = this.modalService.open(ProjectPermissionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.projectPermission = projectPermission;
  }
}
