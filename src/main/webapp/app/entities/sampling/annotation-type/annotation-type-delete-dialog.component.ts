import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAnnotationType } from 'app/shared/model/sampling/annotation-type.model';
import { AnnotationTypeService } from './annotation-type.service';

@Component({
  templateUrl: './annotation-type-delete-dialog.component.html'
})
export class AnnotationTypeDeleteDialogComponent {
  annotationType?: IAnnotationType;

  constructor(
    protected annotationTypeService: AnnotationTypeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.annotationTypeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('annotationTypeListModification');
      this.activeModal.close();
    });
  }
}
