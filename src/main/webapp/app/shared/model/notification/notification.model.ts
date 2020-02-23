import { Moment } from 'moment';
import { NotificationType } from 'app/shared/model/enumerations/notification-type.model';

export interface INotification {
  id?: number;
  title?: string;
  message?: string;
  timestamp?: Moment;
  format?: NotificationType;
  sender?: number;
  user?: number;
  read?: boolean;
}

export class Notification implements INotification {
  constructor(
    public id?: number,
    public title?: string,
    public message?: string,
    public timestamp?: Moment,
    public format?: NotificationType,
    public sender?: number,
    public user?: number,
    public read?: boolean
  ) {
    this.read = this.read || false;
  }
}
