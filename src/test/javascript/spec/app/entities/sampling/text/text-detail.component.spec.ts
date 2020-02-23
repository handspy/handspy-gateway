import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { TextDetailComponent } from 'app/entities/sampling/text/text-detail.component';
import { Text } from 'app/shared/model/sampling/text.model';

describe('Component Tests', () => {
  describe('Text Management Detail Component', () => {
    let comp: TextDetailComponent;
    let fixture: ComponentFixture<TextDetailComponent>;
    const route = ({ data: of({ text: new Text(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [TextDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TextDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TextDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load text on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.text).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
