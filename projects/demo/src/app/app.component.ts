import { Component } from '@angular/core';
import { DynamicWizardQuestionModel } from '@lcu-ide/dynamic-wizard-common';

@Component({
  selector: 'lcu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public Answered(event: DynamicWizardQuestionModel) {
    alert('Answered');
  }
}
