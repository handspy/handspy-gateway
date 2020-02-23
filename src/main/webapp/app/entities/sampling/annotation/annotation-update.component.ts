import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAnnotation, Annotation } from 'app/shared/model/sampling/annotation.model';
import { AnnotationService } from './annotation.service';
import { IText } from 'app/shared/model/sampling/text.model';
import { TextService } from 'app/entities/sampling/text/text.service';

@Component({
  selector: 'hs-annotation-update',
  templateUrl: './annotation-update.component.html'
})
export class AnnotationUpdateComponent implements OnInit {
  isSaving = false;
  texts: IText[] = [];

  editForm = this.fb.group({
    id: [],
    type: [null, [Validators.required]],
    start: [null, [Validators.required]],
    size: [null, [Validators.required]],
    note: [],
    textId: [null, Validators.required]
  });

  constructor(
    protected annotationService: AnnotationService,
    protected textService: TextService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ annotation }) => {
      this.updateForm(annotation);

      this.textService.query().subscribe((res: HttpResponse<IText[]>) => (this.texts = res.body || []));
    });
  }

  updateForm(annotation: IAnnotation): void {
    this.editForm.patchValue({
      id: annotation.id,
      type: annotation.type,
      start: annotation.start,
      size: annotation.size,
      note: annotation.note,
      textId: annotation.textId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const annotation = this.createFromForm();
    if (annotation.id !== undefined) {
      this.subscribeToSaveResponse(this.annotationService.update(annotation));
    } else {
      this.subscribeToSaveResponse(this.annotationService.create(annotation));
    }
  }

  private createFromForm(): IAnnotation {
    return {
      ...new Annotation(),
      id: this.editForm.get(['id'])!.value,
      type: this.editForm.get(['type'])!.value,
      start: this.editForm.get(['start'])!.value,
      size: this.editForm.get(['size'])!.value,
      note: this.editForm.get(['note'])!.value,
      textId: this.editForm.get(['textId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAnnotation>>): void {
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

  trackById(index: number, item: IText): any {
    return item.id;
  }
}
