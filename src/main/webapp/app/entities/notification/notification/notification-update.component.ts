import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { INotification, Notification } from 'app/shared/model/notification/notification.model';
import { NotificationService } from './notification.service';

@Component({
  selector: 'hs-notification-update',
  templateUrl: './notification-update.component.html'
})
export class NotificationUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required, Validators.maxLength(60)]],
    message: [null, [Validators.required, Validators.maxLength(250)]],
    timestamp: [null, [Validators.required]],
    format: [null, [Validators.required]],
    sender: [],
    user: [null, [Validators.required]],
    read: [null, [Validators.required]]
  });

  constructor(protected notificationService: NotificationService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ notification }) => {
      if (!notification.id) {
        const today = moment().startOf('day');
        notification.timestamp = today;
      }

      this.updateForm(notification);
    });
  }

  updateForm(notification: INotification): void {
    this.editForm.patchValue({
      id: notification.id,
      title: notification.title,
      message: notification.message,
      timestamp: notification.timestamp ? notification.timestamp.format(DATE_TIME_FORMAT) : null,
      format: notification.format,
      sender: notification.sender,
      user: notification.user,
      read: notification.read
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const notification = this.createFromForm();
    if (notification.id !== undefined) {
      this.subscribeToSaveResponse(this.notificationService.update(notification));
    } else {
      this.subscribeToSaveResponse(this.notificationService.create(notification));
    }
  }

  private createFromForm(): INotification {
    return {
      ...new Notification(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      message: this.editForm.get(['message'])!.value,
      timestamp: this.editForm.get(['timestamp'])!.value ? moment(this.editForm.get(['timestamp'])!.value, DATE_TIME_FORMAT) : undefined,
      format: this.editForm.get(['format'])!.value,
      sender: this.editForm.get(['sender'])!.value,
      user: this.editForm.get(['user'])!.value,
      read: this.editForm.get(['read'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INotification>>): void {
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
