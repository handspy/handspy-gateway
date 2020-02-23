import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPBBurst } from 'app/shared/model/pbanalysis/pb-burst.model';
import { PBBurstService } from './pb-burst.service';

@Component({
  templateUrl: './pb-burst-delete-dialog.component.html'
})
export class PBBurstDeleteDialogComponent {
  pBBurst?: IPBBurst;

  constructor(protected pBBurstService: PBBurstService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.pBBurstService.delete(id).subscribe(() => {
      this.eventManager.broadcast('pBBurstListModification');
      this.activeModal.close();
    });
  }
}
