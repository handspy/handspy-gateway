import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { PBBurstComponent } from './pb-burst.component';
import { PBBurstDetailComponent } from './pb-burst-detail.component';
import { PBBurstUpdateComponent } from './pb-burst-update.component';
import { PBBurstDeleteDialogComponent } from './pb-burst-delete-dialog.component';
import { pBBurstRoute } from './pb-burst.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(pBBurstRoute)],
  declarations: [PBBurstComponent, PBBurstDetailComponent, PBBurstUpdateComponent, PBBurstDeleteDialogComponent],
  entryComponents: [PBBurstDeleteDialogComponent]
})
export class PbanalysisPBBurstModule {}
