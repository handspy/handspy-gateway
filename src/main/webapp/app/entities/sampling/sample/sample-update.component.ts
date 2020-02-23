import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ISample, Sample } from 'app/shared/model/sampling/sample.model';
import { SampleService } from './sample.service';

@Component({
  selector: 'hs-sample-update',
  templateUrl: './sample-update.component.html'
})
export class SampleUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    task: [null, [Validators.required]],
    participant: [null, [Validators.required]],
    timestamp: [],
    language: []
  });

  constructor(protected sampleService: SampleService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sample }) => {
      if (!sample.id) {
        const today = moment().startOf('day');
        sample.timestamp = today;
      }

      this.updateForm(sample);
    });
  }

  updateForm(sample: ISample): void {
    this.editForm.patchValue({
      id: sample.id,
      task: sample.task,
      participant: sample.participant,
      timestamp: sample.timestamp ? sample.timestamp.format(DATE_TIME_FORMAT) : null,
      language: sample.language
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const sample = this.createFromForm();
    if (sample.id !== undefined) {
      this.subscribeToSaveResponse(this.sampleService.update(sample));
    } else {
      this.subscribeToSaveResponse(this.sampleService.create(sample));
    }
  }

  private createFromForm(): ISample {
    return {
      ...new Sample(),
      id: this.editForm.get(['id'])!.value,
      task: this.editForm.get(['task'])!.value,
      participant: this.editForm.get(['participant'])!.value,
      timestamp: this.editForm.get(['timestamp'])!.value ? moment(this.editForm.get(['timestamp'])!.value, DATE_TIME_FORMAT) : undefined,
      language: this.editForm.get(['language'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISample>>): void {
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
