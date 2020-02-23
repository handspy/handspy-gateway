import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IParticipant, Participant } from 'app/shared/model/project/participant.model';
import { ParticipantService } from './participant.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IProject } from 'app/shared/model/project/project.model';
import { ProjectService } from 'app/entities/project/project/project.service';
import { ILabel } from 'app/shared/model/project/label.model';
import { LabelService } from 'app/entities/project/label/label.service';

type SelectableEntity = IProject | ILabel;

@Component({
  selector: 'hs-participant-update',
  templateUrl: './participant-update.component.html'
})
export class ParticipantUpdateComponent implements OnInit {
  isSaving = false;
  projects: IProject[] = [];
  labels: ILabel[] = [];
  birthdateDp: any;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    gender: [],
    birthdate: [],
    handedness: [],
    additionalInfo: [],
    image: [],
    imageContentType: [],
    projectId: [null, Validators.required],
    labels: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected participantService: ParticipantService,
    protected projectService: ProjectService,
    protected labelService: LabelService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ participant }) => {
      this.updateForm(participant);

      this.projectService.query().subscribe((res: HttpResponse<IProject[]>) => (this.projects = res.body || []));

      this.labelService.query().subscribe((res: HttpResponse<ILabel[]>) => (this.labels = res.body || []));
    });
  }

  updateForm(participant: IParticipant): void {
    this.editForm.patchValue({
      id: participant.id,
      name: participant.name,
      gender: participant.gender,
      birthdate: participant.birthdate,
      handedness: participant.handedness,
      additionalInfo: participant.additionalInfo,
      image: participant.image,
      imageContentType: participant.imageContentType,
      projectId: participant.projectId,
      labels: participant.labels
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('gatewayApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const participant = this.createFromForm();
    if (participant.id !== undefined) {
      this.subscribeToSaveResponse(this.participantService.update(participant));
    } else {
      this.subscribeToSaveResponse(this.participantService.create(participant));
    }
  }

  private createFromForm(): IParticipant {
    return {
      ...new Participant(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      gender: this.editForm.get(['gender'])!.value,
      birthdate: this.editForm.get(['birthdate'])!.value,
      handedness: this.editForm.get(['handedness'])!.value,
      additionalInfo: this.editForm.get(['additionalInfo'])!.value,
      imageContentType: this.editForm.get(['imageContentType'])!.value,
      image: this.editForm.get(['image'])!.value,
      projectId: this.editForm.get(['projectId'])!.value,
      labels: this.editForm.get(['labels'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IParticipant>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: ILabel[], option: ILabel): ILabel {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
