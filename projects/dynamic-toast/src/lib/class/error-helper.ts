import { IErrorInfo, IErrorMessage} from '../interfaces/idialog';

export class ErrorHelper {
  /**
   * Desc : Prepare display error message
   * @param errorMessage : error message response
   * @returns : error message
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static prepareErrorMessage(errorMessage: IErrorMessage): string | any {
    let messageContent = '';
    const message = errorMessage?.message ? errorMessage.message : errorMessage;
    if (errorMessage.info && errorMessage.info?.length > 0) {
      errorMessage.info.map((infoDetails: IErrorInfo, index: number) => {
        messageContent += `<p>${index + 1}.${this.prepareErrorMessage(infoDetails)}</p>`;
      });
    }
    return errorMessage.info && errorMessage.info?.length > 0
      ? `<p>${errorMessage?.message}</p> ${messageContent}`
      : message;
  }
}