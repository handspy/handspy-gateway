import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAnnotation } from 'app/shared/model/sampling/annotation.model';
import { AnnotationService } from './annotation.service';

@Component({
  templateUrl: './annotation-delete-dialog.component.html'
})
export class AnnotationDeleteDialogComponent {
  annotation?: IAnnotation;

  constructor(
    protected annotationService: AnnotationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.annotationService.delete(id).subscribe(() => {
      this.eventManager.broadcast('annotationListModification');
      this.activeModal.close();
    });
  }
}
