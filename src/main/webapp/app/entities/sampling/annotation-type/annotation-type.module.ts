import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { AnnotationTypeComponent } from './annotation-type.component';
import { AnnotationTypeDetailComponent } from './annotation-type-detail.component';
import { AnnotationTypeUpdateComponent } from './annotation-type-update.component';
import { AnnotationTypeDeleteDialogComponent } from './annotation-type-delete-dialog.component';
import { annotationTypeRoute } from './annotation-type.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(annotationTypeRoute)],
  declarations: [
    AnnotationTypeComponent,
    AnnotationTypeDetailComponent,
    AnnotationTypeUpdateComponent,
    AnnotationTypeDeleteDialogComponent
  ],
  entryComponents: [AnnotationTypeDeleteDialogComponent]
})
export class SamplingAnnotationTypeModule {}
