import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAnnotation } from 'app/shared/model/sampling/annotation.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { AnnotationService } from './annotation.service';
import { AnnotationDeleteDialogComponent } from './annotation-delete-dialog.component';

@Component({
  selector: 'hs-annotation',
  templateUrl: './annotation.component.html'
})
export class AnnotationComponent implements OnInit, OnDestroy {
  annotations: IAnnotation[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected annotationService: AnnotationService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.annotations = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.annotationService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IAnnotation[]>) => this.paginateAnnotations(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.annotations = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAnnotations();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAnnotation): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAnnotations(): void {
    this.eventSubscriber = this.eventManager.subscribe('annotationListModification', () => this.reset());
  }

  delete(annotation: IAnnotation): void {
    const modalRef = this.modalService.open(AnnotationDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.annotation = annotation;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateAnnotations(data: IAnnotation[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.annotations.push(data[i]);
      }
    }
  }
}
