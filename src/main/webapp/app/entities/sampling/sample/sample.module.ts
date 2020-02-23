import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { SampleComponent } from './sample.component';
import { SampleDetailComponent } from './sample-detail.component';
import { SampleUpdateComponent } from './sample-update.component';
import { SampleDeleteDialogComponent } from './sample-delete-dialog.component';
import { sampleRoute } from './sample.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(sampleRoute)],
  declarations: [SampleComponent, SampleDetailComponent, SampleUpdateComponent, SampleDeleteDialogComponent],
  entryComponents: [SampleDeleteDialogComponent]
})
export class SamplingSampleModule {}
