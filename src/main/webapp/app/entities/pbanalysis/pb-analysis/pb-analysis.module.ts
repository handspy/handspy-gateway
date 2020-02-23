import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { PBAnalysisComponent } from './pb-analysis.component';
import { PBAnalysisDetailComponent } from './pb-analysis-detail.component';
import { PBAnalysisUpdateComponent } from './pb-analysis-update.component';
import { PBAnalysisDeleteDialogComponent } from './pb-analysis-delete-dialog.component';
import { pBAnalysisRoute } from './pb-analysis.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(pBAnalysisRoute)],
  declarations: [PBAnalysisComponent, PBAnalysisDetailComponent, PBAnalysisUpdateComponent, PBAnalysisDeleteDialogComponent],
  entryComponents: [PBAnalysisDeleteDialogComponent]
})
export class PbanalysisPBAnalysisModule {}
