import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IDot, Dot } from 'app/shared/model/sampling/dot.model';
import { DotService } from './dot.service';
import { IProtocol } from 'app/shared/model/sampling/protocol.model';
import { ProtocolService } from 'app/entities/sampling/protocol/protocol.service';

@Component({
  selector: 'hs-dot-update',
  templateUrl: './dot-update.component.html'
})
export class DotUpdateComponent implements OnInit {
  isSaving = false;
  protocols: IProtocol[] = [];

  editForm = this.fb.group({
    id: [],
    timestamp: [null, [Validators.required]],
    x: [null, [Validators.required]],
    y: [null, [Validators.required]],
    type: [],
    tiltX: [],
    tiltY: [],
    twist: [],
    pressure: [],
    protocolId: [null, Validators.required]
  });

  constructor(
    protected dotService: DotService,
    protected protocolService: ProtocolService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dot }) => {
      if (!dot.id) {
        const today = moment().startOf('day');
        dot.timestamp = today;
      }

      this.updateForm(dot);

      this.protocolService.query().subscribe((res: HttpResponse<IProtocol[]>) => (this.protocols = res.body || []));
    });
  }

  updateForm(dot: IDot): void {
    this.editForm.patchValue({
      id: dot.id,
      timestamp: dot.timestamp ? dot.timestamp.format(DATE_TIME_FORMAT) : null,
      x: dot.x,
      y: dot.y,
      type: dot.type,
      tiltX: dot.tiltX,
      tiltY: dot.tiltY,
      twist: dot.twist,
      pressure: dot.pressure,
      protocolId: dot.protocolId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const dot = this.createFromForm();
    if (dot.id !== undefined) {
      this.subscribeToSaveResponse(this.dotService.update(dot));
    } else {
      this.subscribeToSaveResponse(this.dotService.create(dot));
    }
  }

  private createFromForm(): IDot {
    return {
      ...new Dot(),
      id: this.editForm.get(['id'])!.value,
      timestamp: this.editForm.get(['timestamp'])!.value ? moment(this.editForm.get(['timestamp'])!.value, DATE_TIME_FORMAT) : undefined,
      x: this.editForm.get(['x'])!.value,
      y: this.editForm.get(['y'])!.value,
      type: this.editForm.get(['type'])!.value,
      tiltX: this.editForm.get(['tiltX'])!.value,
      tiltY: this.editForm.get(['tiltY'])!.value,
      twist: this.editForm.get(['twist'])!.value,
      pressure: this.editForm.get(['pressure'])!.value,
      protocolId: this.editForm.get(['protocolId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDot>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IProtocol): any {
    return item.id;
  }
}
