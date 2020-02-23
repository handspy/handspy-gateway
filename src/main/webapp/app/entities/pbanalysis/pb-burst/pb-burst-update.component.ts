import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPBBurst, PBBurst } from 'app/shared/model/pbanalysis/pb-burst.model';
import { PBBurstService } from './pb-burst.service';
import { IPBAnalysis } from 'app/shared/model/pbanalysis/pb-analysis.model';
import { PBAnalysisService } from 'app/entities/pbanalysis/pb-analysis/pb-analysis.service';

@Component({
  selector: 'hs-pb-burst-update',
  templateUrl: './pb-burst-update.component.html'
})
export class PBBurstUpdateComponent implements OnInit {
  isSaving = false;
  pbanalyses: IPBAnalysis[] = [];

  editForm = this.fb.group({
    id: [],
    duration: [null, [Validators.required]],
    pauseDuration: [null, [Validators.required]],
    startX: [null, [Validators.required]],
    startY: [null, [Validators.required]],
    endX: [null, [Validators.required]],
    endY: [null, [Validators.required]],
    distance: [null, [Validators.required]],
    avgSpeed: [null, [Validators.required]],
    text: [],
    analysisId: []
  });

  constructor(
    protected pBBurstService: PBBurstService,
    protected pBAnalysisService: PBAnalysisService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pBBurst }) => {
      this.updateForm(pBBurst);

      this.pBAnalysisService.query().subscribe((res: HttpResponse<IPBAnalysis[]>) => (this.pbanalyses = res.body || []));
    });
  }

  updateForm(pBBurst: IPBBurst): void {
    this.editForm.patchValue({
      id: pBBurst.id,
      duration: pBBurst.duration,
      pauseDuration: pBBurst.pauseDuration,
      startX: pBBurst.startX,
      startY: pBBurst.startY,
      endX: pBBurst.endX,
      endY: pBBurst.endY,
      distance: pBBurst.distance,
      avgSpeed: pBBurst.avgSpeed,
      text: pBBurst.text,
      analysisId: pBBurst.analysisId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pBBurst = this.createFromForm();
    if (pBBurst.id !== undefined) {
      this.subscribeToSaveResponse(this.pBBurstService.update(pBBurst));
    } else {
      this.subscribeToSaveResponse(this.pBBurstService.create(pBBurst));
    }
  }

  private createFromForm(): IPBBurst {
    return {
      ...new PBBurst(),
      id: this.editForm.get(['id'])!.value,
      duration: this.editForm.get(['duration'])!.value,
      pauseDuration: this.editForm.get(['pauseDuration'])!.value,
      startX: this.editForm.get(['startX'])!.value,
      startY: this.editForm.get(['startY'])!.value,
      endX: this.editForm.get(['endX'])!.value,
      endY: this.editForm.get(['endY'])!.value,
      distance: this.editForm.get(['distance'])!.value,
      avgSpeed: this.editForm.get(['avgSpeed'])!.value,
      text: this.editForm.get(['text'])!.value,
      analysisId: this.editForm.get(['analysisId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPBBurst>>): void {
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

  trackById(index: number, item: IPBAnalysis): any {
    return item.id;
  }
}
