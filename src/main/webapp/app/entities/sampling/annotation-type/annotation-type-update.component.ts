import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAnnotationType, AnnotationType } from 'app/shared/model/sampling/annotation-type.model';
import { AnnotationTypeService } from './annotation-type.service';

@Component({
  selector: 'hs-annotation-type-update',
  templateUrl: './annotation-type-update.component.html'
})
export class AnnotationTypeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    label: [null, [Validators.required]],
    description: [null, [Validators.maxLength(300)]],
    emotional: [],
    weight: [],
    color: [null, [Validators.required, Validators.maxLength(20)]]
  });

  constructor(protected annotationTypeService: AnnotationTypeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ annotationType }) => {
      this.updateForm(annotationType);
    });
  }

  updateForm(annotationType: IAnnotationType): void {
    this.editForm.patchValue({
      id: annotationType.id,
      name: annotationType.name,
      label: annotationType.label,
      description: annotationType.description,
      emotional: annotationType.emotional,
      weight: annotationType.weight,
      color: annotationType.color
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const annotationType = this.createFromForm();
    if (annotationType.id !== undefined) {
      this.subscribeToSaveResponse(this.annotationTypeService.update(annotationType));
    } else {
      this.subscribeToSaveResponse(this.annotationTypeService.create(annotationType));
    }
  }

  private createFromForm(): IAnnotationType {
    return {
      ...new AnnotationType(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      label: this.editForm.get(['label'])!.value,
      description: this.editForm.get(['description'])!.value,
      emotional: this.editForm.get(['emotional'])!.value,
      weight: this.editForm.get(['weight'])!.value,
      color: this.editForm.get(['color'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAnnotationType>>): void {
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
}
