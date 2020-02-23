import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPBMetadata } from 'app/shared/model/pbanalysis/pb-metadata.model';
import { PBMetadataService } from './pb-metadata.service';

@Component({
  templateUrl: './pb-metadata-delete-dialog.component.html'
})
export class PBMetadataDeleteDialogComponent {
  pBMetadata?: IPBMetadata;

  constructor(
    protected pBMetadataService: PBMetadataService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.pBMetadataService.delete(id).subscribe(() => {
      this.eventManager.broadcast('pBMetadataListModification');
      this.activeModal.close();
    });
  }
}
