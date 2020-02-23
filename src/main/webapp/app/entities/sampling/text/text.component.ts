import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IText } from 'app/shared/model/sampling/text.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { TextService } from './text.service';
import { TextDeleteDialogComponent } from './text-delete-dialog.component';

@Component({
  selector: 'hs-text',
  templateUrl: './text.component.html'
})
export class TextComponent implements OnInit, OnDestroy {
  texts: IText[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected textService: TextService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.texts = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.textService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IText[]>) => this.paginateTexts(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.texts = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTexts();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IText): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTexts(): void {
    this.eventSubscriber = this.eventManager.subscribe('textListModification', () => this.reset());
  }

  delete(text: IText): void {
    const modalRef = this.modalService.open(TextDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.text = text;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateTexts(data: IText[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.texts.push(data[i]);
      }
    }
  }
}
