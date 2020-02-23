import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDot } from 'app/shared/model/sampling/dot.model';

@Component({
  selector: 'hs-dot-detail',
  templateUrl: './dot-detail.component.html'
})
export class DotDetailComponent implements OnInit {
  dot: IDot | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dot }) => (this.dot = dot));
  }

  previousState(): void {
    window.history.back();
  }
}
