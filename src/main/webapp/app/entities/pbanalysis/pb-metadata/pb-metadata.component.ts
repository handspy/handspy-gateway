import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPBMetadata } from 'app/shared/model/pbanalysis/pb-metadata.model';
import { PBMetadataService } from './pb-metadata.service';
import { PBMetadataDeleteDialogComponent } from './pb-metadata-delete-dialog.component';

@Component({
  selector: 'hs-pb-metadata',
  templateUrl: './pb-metadata.component.html'
})
export class PBMetadataComponent implements OnInit, OnDestroy {
  pBMetadata?: IPBMetadata[];
  eventSubscriber?: Subscription;

  constructor(protected pBMetadataService: PBMetadataService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.pBMetadataService.query().subscribe((res: HttpResponse<IPBMetadata[]>) => (this.pBMetadata = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPBMetadata();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPBMetadata): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPBMetadata(): void {
    this.eventSubscriber = this.eventManager.subscribe('pBMetadataListModification', () => this.loadAll());
  }

  delete(pBMetadata: IPBMetadata): void {
    const modalRef = this.modalService.open(PBMetadataDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.pBMetadata = pBMetadata;
  }
}
