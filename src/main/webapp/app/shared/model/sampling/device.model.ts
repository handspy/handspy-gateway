import { DeviceType } from 'app/shared/model/enumerations/device-type.model';

export interface IDevice {
  id?: number;
  name?: string;
  description?: string;
  type?: DeviceType;
  plugin?: string;
}

export class Device implements IDevice {
  constructor(public id?: number, public name?: string, public description?: string, public type?: DeviceType, public plugin?: string) {}
}
