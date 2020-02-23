import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPBAnalysis } from 'app/shared/model/pbanalysis/pb-analysis.model';

@Component({
  selector: 'hs-pb-analysis-detail',
  templateUrl: './pb-analysis-detail.component.html'
})
export class PBAnalysisDetailComponent implements OnInit {
  pBAnalysis: IPBAnalysis | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pBAnalysis }) => (this.pBAnalysis = pBAnalysis));
  }

  previousState(): void {
    window.history.back();
  }
}
