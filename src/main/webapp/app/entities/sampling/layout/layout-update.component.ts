import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ILayout, Layout } from 'app/shared/model/sampling/layout.model';
import { LayoutService } from './layout.service';

@Component({
  selector: 'hs-layout-update',
  templateUrl: './layout-update.component.html'
})
export class LayoutUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    description: [null, [Validators.maxLength(500)]],
    width: [null, [Validators.required]],
    height: [null, [Validators.required]],
    marginLeft: [null, [Validators.required]],
    marginRight: [null, [Validators.required]],
    marginTop: [null, [Validators.required]],
    marginBottom: [null, [Validators.required]],
    url: []
  });

  constructor(protected layoutService: LayoutService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ layout }) => {
      this.updateForm(layout);
    });
  }

  updateForm(layout: ILayout): void {
    this.editForm.patchValue({
      id: layout.id,
      name: layout.name,
      description: layout.description,
      width: layout.width,
      height: layout.height,
      marginLeft: layout.marginLeft,
      marginRight: layout.marginRight,
      marginTop: layout.marginTop,
      marginBottom: layout.marginBottom,
      url: layout.url
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const layout = this.createFromForm();
    if (layout.id !== undefined) {
      this.subscribeToSaveResponse(this.layoutService.update(layout));
    } else {
      this.subscribeToSaveResponse(this.layoutService.create(layout));
    }
  }

  private createFromForm(): ILayout {
    return {
      ...new Layout(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      width: this.editForm.get(['width'])!.value,
      height: this.editForm.get(['height'])!.value,
      marginLeft: this.editForm.get(['marginLeft'])!.value,
      marginRight: this.editForm.get(['marginRight'])!.value,
      marginTop: this.editForm.get(['marginTop'])!.value,
      marginBottom: this.editForm.get(['marginBottom'])!.value,
      url: this.editForm.get(['url'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILayout>>): void {
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
}
