import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILayout } from 'app/shared/model/sampling/layout.model';
import { LayoutService } from './layout.service';

@Component({
  templateUrl: './layout-delete-dialog.component.html'
})
export class LayoutDeleteDialogComponent {
  layout?: ILayout;

  constructor(protected layoutService: LayoutService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.layoutService.delete(id).subscribe(() => {
      this.eventManager.broadcast('layoutListModification');
      this.activeModal.close();
    });
  }
}
