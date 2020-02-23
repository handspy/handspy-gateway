import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { PBMetadataComponent } from './pb-metadata.component';
import { PBMetadataDetailComponent } from './pb-metadata-detail.component';
import { PBMetadataUpdateComponent } from './pb-metadata-update.component';
import { PBMetadataDeleteDialogComponent } from './pb-metadata-delete-dialog.component';
import { pBMetadataRoute } from './pb-metadata.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(pBMetadataRoute)],
  declarations: [PBMetadataComponent, PBMetadataDetailComponent, PBMetadataUpdateComponent, PBMetadataDeleteDialogComponent],
  entryComponents: [PBMetadataDeleteDialogComponent]
})
export class PbanalysisPBMetadataModule {}
