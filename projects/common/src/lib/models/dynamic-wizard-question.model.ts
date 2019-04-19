export class DynamicWizardQuestionModel {
  /**
   * The question or phrase to be shown to the user to elicit an answer
   */
  public Phrase: string;

  /**
   * The input to output mapping
   */
  public Lookup?: string;

  /**
   * The type of answer (text/ number/ radio/ etc)
   */
  public Type: 'text' | 'number' | 'radio' | 'checkbox' | 'date' | 'daterange';

  /**
   * An optional placeholder for textual responses
   */
  public Placeholder?: string;

  /**
   * Dictates whether or not a response for the particular question is required
   */
  public Required: boolean;

  /**
   * Response field will be added to object upon answering the wizard question
   */
  public Response?: any;

  /**
   * Optional set of options for radio and checkbox questions
   */
  public Options?: string[];
}
