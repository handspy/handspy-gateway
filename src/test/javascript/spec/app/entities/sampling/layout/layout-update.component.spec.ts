import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { LayoutUpdateComponent } from 'app/entities/sampling/layout/layout-update.component';
import { LayoutService } from 'app/entities/sampling/layout/layout.service';
import { Layout } from 'app/shared/model/sampling/layout.model';

describe('Component Tests', () => {
  describe('Layout Management Update Component', () => {
    let comp: LayoutUpdateComponent;
    let fixture: ComponentFixture<LayoutUpdateComponent>;
    let service: LayoutService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [LayoutUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(LayoutUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LayoutUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LayoutService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Layout(123);
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
        const entity = new Layout();
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
