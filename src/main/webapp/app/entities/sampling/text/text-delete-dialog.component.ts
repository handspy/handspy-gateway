import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IText } from 'app/shared/model/sampling/text.model';
import { TextService } from './text.service';

@Component({
  templateUrl: './text-delete-dialog.component.html'
})
export class TextDeleteDialogComponent {
  text?: IText;

  constructor(protected textService: TextService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.textService.delete(id).subscribe(() => {
      this.eventManager.broadcast('textListModification');
      this.activeModal.close();
    });
  }
}
