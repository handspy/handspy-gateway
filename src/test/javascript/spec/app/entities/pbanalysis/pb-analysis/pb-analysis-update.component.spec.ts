import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { PBAnalysisUpdateComponent } from 'app/entities/pbanalysis/pb-analysis/pb-analysis-update.component';
import { PBAnalysisService } from 'app/entities/pbanalysis/pb-analysis/pb-analysis.service';
import { PBAnalysis } from 'app/shared/model/pbanalysis/pb-analysis.model';

describe('Component Tests', () => {
  describe('PBAnalysis Management Update Component', () => {
    let comp: PBAnalysisUpdateComponent;
    let fixture: ComponentFixture<PBAnalysisUpdateComponent>;
    let service: PBAnalysisService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PBAnalysisUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PBAnalysisUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PBAnalysisUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PBAnalysisService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PBAnalysis(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new PBAnalysis();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
