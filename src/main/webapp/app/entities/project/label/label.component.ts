import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILabel } from 'app/shared/model/project/label.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { LabelService } from './label.service';
import { LabelDeleteDialogComponent } from './label-delete-dialog.component';

@Component({
  selector: 'hs-label',
  templateUrl: './label.component.html'
})
export class LabelComponent implements OnInit, OnDestroy {
  labels: ILabel[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected labelService: LabelService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.labels = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.labelService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<ILabel[]>) => this.paginateLabels(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.labels = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInLabels();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILabel): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInLabels(): void {
    this.eventSubscriber = this.eventManager.subscribe('labelListModification', () => this.reset());
  }

  delete(label: ILabel): void {
    const modalRef = this.modalService.open(LabelDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.label = label;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateLabels(data: ILabel[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.labels.push(data[i]);
      }
    }
  }
}
