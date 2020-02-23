import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPBAnalysis, PBAnalysis } from 'app/shared/model/pbanalysis/pb-analysis.model';
import { PBAnalysisService } from './pb-analysis.service';

@Component({
  selector: 'hs-pb-analysis-update',
  templateUrl: './pb-analysis-update.component.html'
})
export class PBAnalysisUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    sample: [],
    threshold: []
  });

  constructor(protected pBAnalysisService: PBAnalysisService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pBAnalysis }) => {
      this.updateForm(pBAnalysis);
    });
  }

  updateForm(pBAnalysis: IPBAnalysis): void {
    this.editForm.patchValue({
      id: pBAnalysis.id,
      sample: pBAnalysis.sample,
      threshold: pBAnalysis.threshold
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pBAnalysis = this.createFromForm();
    if (pBAnalysis.id !== undefined) {
      this.subscribeToSaveResponse(this.pBAnalysisService.update(pBAnalysis));
    } else {
      this.subscribeToSaveResponse(this.pBAnalysisService.create(pBAnalysis));
    }
  }

  private createFromForm(): IPBAnalysis {
    return {
      ...new PBAnalysis(),
      id: this.editForm.get(['id'])!.value,
      sample: this.editForm.get(['sample'])!.value,
      threshold: this.editForm.get(['threshold'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPBAnalysis>>): void {
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
