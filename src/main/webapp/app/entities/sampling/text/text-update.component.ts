import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IText, Text } from 'app/shared/model/sampling/text.model';
import { TextService } from './text.service';
import { ISample } from 'app/shared/model/sampling/sample.model';
import { SampleService } from 'app/entities/sampling/sample/sample.service';

@Component({
  selector: 'hs-text-update',
  templateUrl: './text-update.component.html'
})
export class TextUpdateComponent implements OnInit {
  isSaving = false;
  samples: ISample[] = [];

  editForm = this.fb.group({
    id: [],
    text: [],
    sampleId: [null, Validators.required]
  });

  constructor(
    protected textService: TextService,
    protected sampleService: SampleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ text }) => {
      this.updateForm(text);

      this.sampleService.query().subscribe((res: HttpResponse<ISample[]>) => (this.samples = res.body || []));
    });
  }

  updateForm(text: IText): void {
    this.editForm.patchValue({
      id: text.id,
      text: text.text,
      sampleId: text.sampleId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const text = this.createFromForm();
    if (text.id !== undefined) {
      this.subscribeToSaveResponse(this.textService.update(text));
    } else {
      this.subscribeToSaveResponse(this.textService.create(text));
    }
  }

  private createFromForm(): IText {
    return {
      ...new Text(),
      id: this.editForm.get(['id'])!.value,
      text: this.editForm.get(['text'])!.value,
      sampleId: this.editForm.get(['sampleId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IText>>): void {
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

  trackById(index: number, item: ISample): any {
    return item.id;
  }
}
