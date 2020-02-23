import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { DeviceDetailComponent } from 'app/entities/sampling/device/device-detail.component';
import { Device } from 'app/shared/model/sampling/device.model';

describe('Component Tests', () => {
  describe('Device Management Detail Component', () => {
    let comp: DeviceDetailComponent;
    let fixture: ComponentFixture<DeviceDetailComponent>;
    const route = ({ data: of({ device: new Device(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [DeviceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DeviceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DeviceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load device on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.device).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
