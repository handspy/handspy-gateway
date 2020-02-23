import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPBAnalysis } from 'app/shared/model/pbanalysis/pb-analysis.model';
import { PBAnalysisService } from './pb-analysis.service';

@Component({
  templateUrl: './pb-analysis-delete-dialog.component.html'
})
export class PBAnalysisDeleteDialogComponent {
  pBAnalysis?: IPBAnalysis;

  constructor(
    protected pBAnalysisService: PBAnalysisService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.pBAnalysisService.delete(id).subscribe(() => {
      this.eventManager.broadcast('pBAnalysisListModification');
      this.activeModal.close();
    });
  }
}
