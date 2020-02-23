import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IText } from 'app/shared/model/sampling/text.model';

@Component({
  selector: 'hs-text-detail',
  templateUrl: './text-detail.component.html'
})
export class TextDetailComponent implements OnInit {
  text: IText | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ text }) => (this.text = text));
  }

  previousState(): void {
    window.history.back();
  }
}
