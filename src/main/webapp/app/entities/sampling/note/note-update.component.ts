import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { INote, Note } from 'app/shared/model/sampling/note.model';
import { NoteService } from './note.service';
import { ISample } from 'app/shared/model/sampling/sample.model';
import { SampleService } from 'app/entities/sampling/sample/sample.service';

@Component({
  selector: 'hs-note-update',
  templateUrl: './note-update.component.html'
})
export class NoteUpdateComponent implements OnInit {
  isSaving = false;
  samples: ISample[] = [];

  editForm = this.fb.group({
    id: [],
    text: [],
    self: [],
    sampleId: [null, Validators.required]
  });

  constructor(
    protected noteService: NoteService,
    protected sampleService: SampleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ note }) => {
      this.updateForm(note);

      this.sampleService.query().subscribe((res: HttpResponse<ISample[]>) => (this.samples = res.body || []));
    });
  }

  updateForm(note: INote): void {
    this.editForm.patchValue({
      id: note.id,
      text: note.text,
      self: note.self,
      sampleId: note.sampleId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const note = this.createFromForm();
    if (note.id !== undefined) {
      this.subscribeToSaveResponse(this.noteService.update(note));
    } else {
      this.subscribeToSaveResponse(this.noteService.create(note));
    }
  }

  private createFromForm(): INote {
    return {
      ...new Note(),
      id: this.editForm.get(['id'])!.value,
      text: this.editForm.get(['text'])!.value,
      self: this.editForm.get(['self'])!.value,
      sampleId: this.editForm.get(['sampleId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INote>>): void {
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
