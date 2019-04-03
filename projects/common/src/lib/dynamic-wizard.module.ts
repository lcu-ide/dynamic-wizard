import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { FathymSharedModule } from '@lcu-ide/common';
import { DynamicWizardComponent } from './controls/dynamic-wizard/dynamic-wizard.component';

@NgModule({
  declarations: [DynamicWizardComponent],
  imports: [
    FathymSharedModule,
    MatButtonModule
  ],
  exports: [DynamicWizardComponent],
  entryComponents: [DynamicWizardComponent]
})
export class DynamicWizardModule { }
