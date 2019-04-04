import { FormGroup } from '@angular/forms';

export class InternalWizardQuestionModel {

    /**
     * The name of the form group
     */
    public FormGroup: FormGroup;

    /**
     * THe name of the form control
     */
    public FormCtrl: string | string[];

    /**
     * The question to be displayed
     */
    public Question: string;

    /**
     * The type of question
     */
    public Type: string;

    /**
     * Optional placeholder to display
     */
    public Placeholder: string;

    /**
     * Optional options to display
     */
    public Options: any[];

    /**
     * Boolean to determine whether or not an answer is required or optional
     */
    public Required: boolean;

    /**
     * Date range used for date range question types
     */
    public DateRange?: {};
}