import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDot } from 'app/shared/model/sampling/dot.model';
import { DotService } from './dot.service';
import { DotDeleteDialogComponent } from './dot-delete-dialog.component';

@Component({
  selector: 'hs-dot',
  templateUrl: './dot.component.html'
})
export class DotComponent implements OnInit, OnDestroy {
  dots?: IDot[];
  eventSubscriber?: Subscription;

  constructor(protected dotService: DotService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.dotService.query().subscribe((res: HttpResponse<IDot[]>) => (this.dots = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDots();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDot): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDots(): void {
    this.eventSubscriber = this.eventManager.subscribe('dotListModification', () => this.loadAll());
  }

  delete(dot: IDot): void {
    const modalRef = this.modalService.open(DotDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.dot = dot;
  }
}
