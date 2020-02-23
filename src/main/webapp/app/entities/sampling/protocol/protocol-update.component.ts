import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProtocol, Protocol } from 'app/shared/model/sampling/protocol.model';
import { ProtocolService } from './protocol.service';
import { ISample } from 'app/shared/model/sampling/sample.model';
import { SampleService } from 'app/entities/sampling/sample/sample.service';

@Component({
  selector: 'hs-protocol-update',
  templateUrl: './protocol-update.component.html'
})
export class ProtocolUpdateComponent implements OnInit {
  isSaving = false;
  samples: ISample[] = [];

  editForm = this.fb.group({
    id: [],
    layout: [],
    device: [],
    pageNumber: [],
    sampleId: [null, Validators.required]
  });

  constructor(
    protected protocolService: ProtocolService,
    protected sampleService: SampleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ protocol }) => {
      this.updateForm(protocol);

      this.sampleService.query().subscribe((res: HttpResponse<ISample[]>) => (this.samples = res.body || []));
    });
  }

  updateForm(protocol: IProtocol): void {
    this.editForm.patchValue({
      id: protocol.id,
      layout: protocol.layout,
      device: protocol.device,
      pageNumber: protocol.pageNumber,
      sampleId: protocol.sampleId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const protocol = this.createFromForm();
    if (protocol.id !== undefined) {
      this.subscribeToSaveResponse(this.protocolService.update(protocol));
    } else {
      this.subscribeToSaveResponse(this.protocolService.create(protocol));
    }
  }

  private createFromForm(): IProtocol {
    return {
      ...new Protocol(),
      id: this.editForm.get(['id'])!.value,
      layout: this.editForm.get(['layout'])!.value,
      device: this.editForm.get(['device'])!.value,
      pageNumber: this.editForm.get(['pageNumber'])!.value,
      sampleId: this.editForm.get(['sampleId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProtocol>>): void {
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

  trackById(index: number, item: ISample): any {
    return item.id;
  }
}
