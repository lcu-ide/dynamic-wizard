import { NgModule } from '@angular/core';
import {
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatRadioModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';
import { FathymSharedModule } from '@lcu-ide/common';
import { DynamicWizardComponent } from './controls/dynamic-wizard/dynamic-wizard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DynamicWizardComponent],
  imports: [
    FathymSharedModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [DynamicWizardComponent],
  entryComponents: [DynamicWizardComponent]
})
export class DynamicWizardModule { }
