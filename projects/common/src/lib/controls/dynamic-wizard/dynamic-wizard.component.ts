import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DynamicWizardQuestionModel } from '../../core/dynamic-wizard-question.model';

@Component({
  selector: 'lcu-dynamic-wizard',
  templateUrl: './dynamic-wizard.component.html',
  styleUrls: ['./dynamic-wizard.component.scss']
})
export class DynamicWizardComponent implements OnInit {
  //  Fields

  //  Properties
  @Input('questions')
  public Questions: DynamicWizardQuestionModel[];

  @Output('answered')
  public Answered: EventEmitter<DynamicWizardQuestionModel[]>;

  //  Constructors
  constructor() {
    this.Answered = new EventEmitter();
  }

  //  Life Cycle
  public ngOnInit() {}

  //  API Methods
  public SubmitAnswers() {
    this.Answered.emit(<any>{});
  }

  //  Helpers
}
