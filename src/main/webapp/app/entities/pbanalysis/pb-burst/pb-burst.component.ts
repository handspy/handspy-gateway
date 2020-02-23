import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPBBurst } from 'app/shared/model/pbanalysis/pb-burst.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { PBBurstService } from './pb-burst.service';
import { PBBurstDeleteDialogComponent } from './pb-burst-delete-dialog.component';

@Component({
  selector: 'hs-pb-burst',
  templateUrl: './pb-burst.component.html'
})
export class PBBurstComponent implements OnInit, OnDestroy {
  pBBursts: IPBBurst[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected pBBurstService: PBBurstService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.pBBursts = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.pBBurstService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IPBBurst[]>) => this.paginatePBBursts(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.pBBursts = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPBBursts();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPBBurst): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPBBursts(): void {
    this.eventSubscriber = this.eventManager.subscribe('pBBurstListModification', () => this.reset());
  }

  delete(pBBurst: IPBBurst): void {
    const modalRef = this.modalService.open(PBBurstDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.pBBurst = pBBurst;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginatePBBursts(data: IPBBurst[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.pBBursts.push(data[i]);
      }
    }
  }
}
