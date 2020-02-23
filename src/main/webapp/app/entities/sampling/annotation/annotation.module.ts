import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { AnnotationComponent } from './annotation.component';
import { AnnotationDetailComponent } from './annotation-detail.component';
import { AnnotationUpdateComponent } from './annotation-update.component';
import { AnnotationDeleteDialogComponent } from './annotation-delete-dialog.component';
import { annotationRoute } from './annotation.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(annotationRoute)],
  declarations: [AnnotationComponent, AnnotationDetailComponent, AnnotationUpdateComponent, AnnotationDeleteDialogComponent],
  entryComponents: [AnnotationDeleteDialogComponent]
})
export class SamplingAnnotationModule {}
