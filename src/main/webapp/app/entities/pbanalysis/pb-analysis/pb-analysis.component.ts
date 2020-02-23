import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPBAnalysis } from 'app/shared/model/pbanalysis/pb-analysis.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { PBAnalysisService } from './pb-analysis.service';
import { PBAnalysisDeleteDialogComponent } from './pb-analysis-delete-dialog.component';

@Component({
  selector: 'hs-pb-analysis',
  templateUrl: './pb-analysis.component.html'
})
export class PBAnalysisComponent implements OnInit, OnDestroy {
  pBAnalyses: IPBAnalysis[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected pBAnalysisService: PBAnalysisService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.pBAnalyses = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.pBAnalysisService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IPBAnalysis[]>) => this.paginatePBAnalyses(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.pBAnalyses = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPBAnalyses();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPBAnalysis): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPBAnalyses(): void {
    this.eventSubscriber = this.eventManager.subscribe('pBAnalysisListModification', () => this.reset());
  }

  delete(pBAnalysis: IPBAnalysis): void {
    const modalRef = this.modalService.open(PBAnalysisDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.pBAnalysis = pBAnalysis;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginatePBAnalyses(data: IPBAnalysis[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.pBAnalyses.push(data[i]);
      }
    }
  }
}
