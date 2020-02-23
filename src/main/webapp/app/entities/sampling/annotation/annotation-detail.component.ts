import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAnnotation } from 'app/shared/model/sampling/annotation.model';

@Component({
  selector: 'hs-annotation-detail',
  templateUrl: './annotation-detail.component.html'
})
export class AnnotationDetailComponent implements OnInit {
  annotation: IAnnotation | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ annotation }) => (this.annotation = annotation));
  }

  previousState(): void {
    window.history.back();
  }
}
