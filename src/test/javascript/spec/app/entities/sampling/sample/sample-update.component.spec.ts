import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { SampleUpdateComponent } from 'app/entities/sampling/sample/sample-update.component';
import { SampleService } from 'app/entities/sampling/sample/sample.service';
import { Sample } from 'app/shared/model/sampling/sample.model';

describe('Component Tests', () => {
  describe('Sample Management Update Component', () => {
    let comp: SampleUpdateComponent;
    let fixture: ComponentFixture<SampleUpdateComponent>;
    let service: SampleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [SampleUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SampleUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SampleUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SampleService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Sample(123);
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
        const entity = new Sample();
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
