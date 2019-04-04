import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DynamicWizardQuestionModel } from '../../core/dynamic-wizard-question.model';
import { InternalWizardQuestionModel } from '../../core/internal-wizard-question.model';
import { MatStepper } from '@angular/material';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'lcu-dynamic-wizard',
  templateUrl: './dynamic-wizard.component.html',
  styleUrls: ['./dynamic-wizard.component.scss']
})
export class DynamicWizardComponent implements OnInit {
  //  Fields

  /**
   * Shows error if no checkbox selected for a "required" checkbox question (no native support for Reactive Form validation of Mat-Checkbox)
   */
  public ShowCheckboxError: boolean;

  /**
   * The stepper control for the current step
   */
  stepper: MatStepper;

  //  Properties

  /**
   * The array of Question objects passed in from parent element
   */
  @Input('JSONQuestions') 
  public JSONQuestions: DynamicWizardQuestionModel[] = this.returnDefaults();

  /**
   * The array of Questions with the response property attached that will be sent with the emission of the completion of the wizard questions
   */
  @Output('AnsweredQuestions')
  public AnsweredQuestions: EventEmitter<DynamicWizardQuestionModel[]>;

  /**
   * The array of questions that will be populated in the html
   */
  public WizardQs: InternalWizardQuestionModel[];

  //  Constructors
  constructor(private _formBuilder: FormBuilder) {
    this.AnsweredQuestions = new EventEmitter();
  }

  //  Life Cycle
  public ngOnInit() {
    this.setUpQuestions();
  }

  //  API Methods

  //  Helpers
  /**
   * Converts the Question array passed in from parent element to wizard questions that will populate the wizard
   */
  setUpQuestions(): void {
    this.WizardQs = [];
    this.JSONQuestions.forEach((el, idx) => {
      let currentCtrl = `ctrl${idx}`;
      let formGroup: FormGroup;
      if (el.Type === 'checkbox') { // for checkboxes, assign multiple form controls depending on number of checkboxes
        formGroup = this._formBuilder.group({});
        el.Options.forEach((o) => {
          formGroup.addControl(o, new FormControl('', []));
        });
      } else if (el.Type === 'daterange') { // for date ranges, assign two controls to form - one start date and one end date
        formGroup = this._formBuilder.group({});
        ['startDate', 'endDate'].forEach((date) => {
          formGroup.addControl(date, new FormControl('', []));
        });
      } else { // assign single form control to question
        formGroup = this._formBuilder.group({ [currentCtrl]: [] });
      }
      let wizQObject: InternalWizardQuestionModel = {
        FormGroup: formGroup,
        FormCtrl: currentCtrl,
        Question: el.Phrase,
        Type: el.Type,
        Placeholder: el.Placeholder,
        Options: el.Options,
        Required: el.Required,
      }
      if (el.Type === 'daterange') { // if it's a date range, response will be an object with two properties
        wizQObject.DateRange = { startDate: null, endDate: null };
      };
      this.WizardQs.push(wizQObject);
    });
  }

  /**
   * 
   * @param wizQuestion the question object to which the response property will be added
   * @param stepper the stepper control for the current step
   * 
   * Adds the response property to the question object
   */
  setValue(wizQuestion: any, stepper: MatStepper): void {

    this.stepper = stepper;
    wizQuestion.FormGroup.submitted = true;

    this.JSONQuestions.forEach((JSONQ) => {
      if (JSONQ.Phrase === wizQuestion.Question) {
        if (wizQuestion.Type === 'checkbox') {
          JSONQ.Response = wizQuestion.FormGroup.value;
          if (JSONQ.Required === true && !this.isBoxChecked(JSONQ.Response)) {
            this.stepper.previous();
          } else {
            this.ShowCheckboxError = false;
          }
        } else if (wizQuestion.Type === 'daterange') {
          JSONQ.Response = {};
          JSONQ.Response.startDate = wizQuestion.FormGroup.controls.startDate.value;
          JSONQ.Response.endDate = wizQuestion.FormGroup.controls.endDate.value;
        } else {
          JSONQ.Response = wizQuestion.FormGroup.value[wizQuestion.FormCtrl];
        }
      }
    });
  }

  /**
   * 
   * @param option the string representing the checkbox option
   * @param formGroup the form group to which the option belongs
   * 
   * Toggles the checkbox on or off
   */
  toggleCheckbox(option: string, formGroup: FormGroup): void {
    formGroup.value[option] === '' ? formGroup.patchValue({ [option]: 'true' }) : formGroup.patchValue({ [option]: '' });
    this.isBoxChecked(formGroup.value);
  }

  /**
   * 
   * @param checkboxResponseObject the object of checkbox values to validate
   * 
   * Checks object of checkbox values and returns false if no boxes are checked - otherwise returns true
   */
  isBoxChecked(checkboxResponseObject: Object): boolean {
    for (let box of Object.values(checkboxResponseObject)) {
      if (box !== '') {
        this.ShowCheckboxError = false;
        return true;
      }
    }
    this.ShowCheckboxError = true;
    return false;
  }

  returnDefaults(): DynamicWizardQuestionModel[] {
    let defaults: DynamicWizardQuestionModel[];
    defaults = [{
      Phrase: 'Text question (required)',
      Type: 'text',
      Required: true
    },
    {
      Phrase: 'Text question (optional)',
      Type: 'text',
      Required: false
    },
    {
      Phrase: 'Number question (required)',
      Type: 'number',
      Required: true
    },
    {
      Phrase: 'Number question (optional)',
      Type: 'number',
      Required: false
    },
    {
      Phrase: 'Radio question (required)',
      Type: 'radio',
      Required: true,
      Options: ['first', 'second', 'third', 'fourth', 'fifth']
    },
    {
      Phrase: 'Radio question (optional)',
      Type: 'radio',
      Required: false,
      Options: ['first', 'second', 'third', 'fourth', 'fifth']
    },
    {
      Phrase: 'Checkbox question (required)',
      Type: 'checkbox',
      Required: true,
      Options: ['first', 'second', 'third', 'fourth', 'fifth']
    },
    {
      Phrase: 'Checkbox question (optional)',
      Type: 'checkbox',
      Required: false,
      Options: ['first', 'second', 'third', 'fourth', 'fifth']
    },
    {
      Phrase: 'Date Picker question (required)',
      Type: 'date',
      Required: true
    },
    {
      Phrase: 'Date Picker question (optional)',
      Type: 'date',
      Required: false
    },
    {
      Phrase: 'Date Range question (required)',
      Type: 'daterange',
      Required: true
    },
    {
      Phrase: 'Date Range question (optional)',
      Type: 'daterange',
      Required: false
    }];
    return defaults;
  }

  /**
   * Upon completing the wizard, this will emit an event with the array of JSON questions - user's response property attached
   */
  emitResults(): void {
    this.AnsweredQuestions.emit(this.JSONQuestions);

    // for now, just log the output
    console.log(this.JSONQuestions);
  }


}
