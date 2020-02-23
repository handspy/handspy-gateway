import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISample } from 'app/shared/model/sampling/sample.model';
import { SampleService } from './sample.service';

@Component({
  templateUrl: './sample-delete-dialog.component.html'
})
export class SampleDeleteDialogComponent {
  sample?: ISample;

  constructor(protected sampleService: SampleService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.sampleService.delete(id).subscribe(() => {
      this.eventManager.broadcast('sampleListModification');
      this.activeModal.close();
    });
  }
}
