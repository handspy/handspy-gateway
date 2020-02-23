import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { AnnotationTypeDetailComponent } from 'app/entities/sampling/annotation-type/annotation-type-detail.component';
import { AnnotationType } from 'app/shared/model/sampling/annotation-type.model';

describe('Component Tests', () => {
  describe('AnnotationType Management Detail Component', () => {
    let comp: AnnotationTypeDetailComponent;
    let fixture: ComponentFixture<AnnotationTypeDetailComponent>;
    const route = ({ data: of({ annotationType: new AnnotationType(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AnnotationTypeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AnnotationTypeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AnnotationTypeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load annotationType on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.annotationType).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
