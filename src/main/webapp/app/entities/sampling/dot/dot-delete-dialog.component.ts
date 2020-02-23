import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDot } from 'app/shared/model/sampling/dot.model';
import { DotService } from './dot.service';

@Component({
  templateUrl: './dot-delete-dialog.component.html'
})
export class DotDeleteDialogComponent {
  dot?: IDot;

  constructor(protected dotService: DotService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.dotService.delete(id).subscribe(() => {
      this.eventManager.broadcast('dotListModification');
      this.activeModal.close();
    });
  }
}
