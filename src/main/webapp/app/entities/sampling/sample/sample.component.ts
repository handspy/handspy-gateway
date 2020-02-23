import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISample } from 'app/shared/model/sampling/sample.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { SampleService } from './sample.service';
import { SampleDeleteDialogComponent } from './sample-delete-dialog.component';

@Component({
  selector: 'hs-sample',
  templateUrl: './sample.component.html'
})
export class SampleComponent implements OnInit, OnDestroy {
  samples: ISample[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected sampleService: SampleService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.samples = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.sampleService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<ISample[]>) => this.paginateSamples(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.samples = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSamples();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISample): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSamples(): void {
    this.eventSubscriber = this.eventManager.subscribe('sampleListModification', () => this.reset());
  }

  delete(sample: ISample): void {
    const modalRef = this.modalService.open(SampleDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.sample = sample;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateSamples(data: ISample[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.samples.push(data[i]);
      }
    }
  }
}
