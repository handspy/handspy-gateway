import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAnnotationType } from 'app/shared/model/sampling/annotation-type.model';

@Component({
  selector: 'hs-annotation-type-detail',
  templateUrl: './annotation-type-detail.component.html'
})
export class AnnotationTypeDetailComponent implements OnInit {
  annotationType: IAnnotationType | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ annotationType }) => (this.annotationType = annotationType));
  }

  previousState(): void {
    window.history.back();
  }
}
