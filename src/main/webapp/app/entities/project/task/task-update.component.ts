import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITask, Task } from 'app/shared/model/project/task.model';
import { TaskService } from './task.service';
import { IProject } from 'app/shared/model/project/project.model';
import { ProjectService } from 'app/entities/project/project/project.service';
import { ILabel } from 'app/shared/model/project/label.model';
import { LabelService } from 'app/entities/project/label/label.service';

type SelectableEntity = IProject | ILabel;

@Component({
  selector: 'hs-task-update',
  templateUrl: './task-update.component.html'
})
export class TaskUpdateComponent implements OnInit {
  isSaving = false;
  projects: IProject[] = [];
  labels: ILabel[] = [];
  startDateDp: any;
  endDateDp: any;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    description: [null, [Validators.maxLength(500)]],
    startDate: [],
    endDate: [],
    projectId: [null, Validators.required],
    labels: []
  });

  constructor(
    protected taskService: TaskService,
    protected projectService: ProjectService,
    protected labelService: LabelService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ task }) => {
      this.updateForm(task);

      this.projectService.query().subscribe((res: HttpResponse<IProject[]>) => (this.projects = res.body || []));

      this.labelService.query().subscribe((res: HttpResponse<ILabel[]>) => (this.labels = res.body || []));
    });
  }

  updateForm(task: ITask): void {
    this.editForm.patchValue({
      id: task.id,
      name: task.name,
      description: task.description,
      startDate: task.startDate,
      endDate: task.endDate,
      projectId: task.projectId,
      labels: task.labels
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const task = this.createFromForm();
    if (task.id !== undefined) {
      this.subscribeToSaveResponse(this.taskService.update(task));
    } else {
      this.subscribeToSaveResponse(this.taskService.create(task));
    }
  }

  private createFromForm(): ITask {
    return {
      ...new Task(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      startDate: this.editForm.get(['startDate'])!.value,
      endDate: this.editForm.get(['endDate'])!.value,
      projectId: this.editForm.get(['projectId'])!.value,
      labels: this.editForm.get(['labels'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITask>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: ILabel[], option: ILabel): ILabel {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
