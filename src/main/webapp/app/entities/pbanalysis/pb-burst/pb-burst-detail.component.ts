import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPBBurst } from 'app/shared/model/pbanalysis/pb-burst.model';

@Component({
  selector: 'hs-pb-burst-detail',
  templateUrl: './pb-burst-detail.component.html'
})
export class PBBurstDetailComponent implements OnInit {
  pBBurst: IPBBurst | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pBBurst }) => (this.pBBurst = pBBurst));
  }

  previousState(): void {
    window.history.back();
  }
}
