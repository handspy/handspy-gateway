import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProjectPermission, ProjectPermission } from 'app/shared/model/project/project-permission.model';
import { ProjectPermissionService } from './project-permission.service';
import { IProject } from 'app/shared/model/project/project.model';
import { ProjectService } from 'app/entities/project/project/project.service';

@Component({
  selector: 'hs-project-permission-update',
  templateUrl: './project-permission-update.component.html'
})
export class ProjectPermissionUpdateComponent implements OnInit {
  isSaving = false;
  projects: IProject[] = [];

  editForm = this.fb.group({
    id: [],
    user: [null, [Validators.required]],
    permission: [],
    projectId: [null, Validators.required]
  });

  constructor(
    protected projectPermissionService: ProjectPermissionService,
    protected projectService: ProjectService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ projectPermission }) => {
      this.updateForm(projectPermission);

      this.projectService.query().subscribe((res: HttpResponse<IProject[]>) => (this.projects = res.body || []));
    });
  }

  updateForm(projectPermission: IProjectPermission): void {
    this.editForm.patchValue({
      id: projectPermission.id,
      user: projectPermission.user,
      permission: projectPermission.permission,
      projectId: projectPermission.projectId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const projectPermission = this.createFromForm();
    if (projectPermission.id !== undefined) {
      this.subscribeToSaveResponse(this.projectPermissionService.update(projectPermission));
    } else {
      this.subscribeToSaveResponse(this.projectPermissionService.create(projectPermission));
    }
  }

  private createFromForm(): IProjectPermission {
    return {
      ...new ProjectPermission(),
      id: this.editForm.get(['id'])!.value,
      user: this.editForm.get(['user'])!.value,
      permission: this.editForm.get(['permission'])!.value,
      projectId: this.editForm.get(['projectId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProjectPermission>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IProject): any {
    return item.id;
  }
}
