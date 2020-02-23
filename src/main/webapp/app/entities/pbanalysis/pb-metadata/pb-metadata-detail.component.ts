import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPBMetadata } from 'app/shared/model/pbanalysis/pb-metadata.model';

@Component({
  selector: 'hs-pb-metadata-detail',
  templateUrl: './pb-metadata-detail.component.html'
})
export class PBMetadataDetailComponent implements OnInit {
  pBMetadata: IPBMetadata | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pBMetadata }) => (this.pBMetadata = pBMetadata));
  }

  previousState(): void {
    window.history.back();
  }
}
