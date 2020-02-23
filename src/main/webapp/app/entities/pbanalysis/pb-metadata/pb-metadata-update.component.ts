import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPBMetadata, PBMetadata } from 'app/shared/model/pbanalysis/pb-metadata.model';
import { PBMetadataService } from './pb-metadata.service';
import { IPBAnalysis } from 'app/shared/model/pbanalysis/pb-analysis.model';
import { PBAnalysisService } from 'app/entities/pbanalysis/pb-analysis/pb-analysis.service';

@Component({
  selector: 'hs-pb-metadata-update',
  templateUrl: './pb-metadata-update.component.html'
})
export class PBMetadataUpdateComponent implements OnInit {
  isSaving = false;
  pbanalyses: IPBAnalysis[] = [];

  editForm = this.fb.group({
    id: [],
    key: [],
    value: [],
    analysisId: []
  });

  constructor(
    protected pBMetadataService: PBMetadataService,
    protected pBAnalysisService: PBAnalysisService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pBMetadata }) => {
      this.updateForm(pBMetadata);

      this.pBAnalysisService.query().subscribe((res: HttpResponse<IPBAnalysis[]>) => (this.pbanalyses = res.body || []));
    });
  }

  updateForm(pBMetadata: IPBMetadata): void {
    this.editForm.patchValue({
      id: pBMetadata.id,
      key: pBMetadata.key,
      value: pBMetadata.value,
      analysisId: pBMetadata.analysisId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pBMetadata = this.createFromForm();
    if (pBMetadata.id !== undefined) {
      this.subscribeToSaveResponse(this.pBMetadataService.update(pBMetadata));
    } else {
      this.subscribeToSaveResponse(this.pBMetadataService.create(pBMetadata));
    }
  }

  private createFromForm(): IPBMetadata {
    return {
      ...new PBMetadata(),
      id: this.editForm.get(['id'])!.value,
      key: this.editForm.get(['key'])!.value,
      value: this.editForm.get(['value'])!.value,
      analysisId: this.editForm.get(['analysisId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPBMetadata>>): void {
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
