import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ProtocolDetailComponent } from 'app/entities/sampling/protocol/protocol-detail.component';
import { Protocol } from 'app/shared/model/sampling/protocol.model';

describe('Component Tests', () => {
  describe('Protocol Management Detail Component', () => {
    let comp: ProtocolDetailComponent;
    let fixture: ComponentFixture<ProtocolDetailComponent>;
    const route = ({ data: of({ protocol: new Protocol(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ProtocolDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProtocolDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProtocolDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load protocol on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.protocol).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
