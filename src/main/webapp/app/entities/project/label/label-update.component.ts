import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ILabel, Label } from 'app/shared/model/project/label.model';
import { LabelService } from './label.service';
import { IProject } from 'app/shared/model/project/project.model';
import { ProjectService } from 'app/entities/project/project/project.service';

@Component({
  selector: 'hs-label-update',
  templateUrl: './label-update.component.html'
})
export class LabelUpdateComponent implements OnInit {
  isSaving = false;
  projects: IProject[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.maxLength(50)]],
    color: [null, [Validators.required, Validators.maxLength(20)]],
    projectId: [null, Validators.required]
  });

  constructor(
    protected labelService: LabelService,
    protected projectService: ProjectService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ label }) => {
      this.updateForm(label);

      this.projectService.query().subscribe((res: HttpResponse<IProject[]>) => (this.projects = res.body || []));
    });
  }

  updateForm(label: ILabel): void {
    this.editForm.patchValue({
      id: label.id,
      name: label.name,
      color: label.color,
      projectId: label.projectId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const label = this.createFromForm();
    if (label.id !== undefined) {
      this.subscribeToSaveResponse(this.labelService.update(label));
    } else {
      this.subscribeToSaveResponse(this.labelService.create(label));
    }
  }

  private createFromForm(): ILabel {
    return {
      ...new Label(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      color: this.editForm.get(['color'])!.value,
      projectId: this.editForm.get(['projectId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILabel>>): void {
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
