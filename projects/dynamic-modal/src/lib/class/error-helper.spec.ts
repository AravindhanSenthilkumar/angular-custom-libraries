import { ErrorHelper } from './error-helper';
import { IErrorMessage } from '../interfaces/idialog';


describe('UrlHelper', () => {
  it('should create an instance', () => {
    expect(new ErrorHelper()).toBeTruthy();
  });


  it('should have prepareErrorMessage', () => {
    const errorMessage: IErrorMessage = {
      code: '0',
      info: [],
      message: 'No records',
    };
    const error = ErrorHelper.prepareErrorMessage(errorMessage);
    expect(error).toBe('No records');
  });


  it('should have prepareErrorMessage', () => {
    const errorMessage: IErrorMessage = {
      code: '0',
      info: [
        {
          code: '0',
          message: 'request is null',
        },
      ],
      message: 'The following validation occured:',
    };
    const error = ErrorHelper.prepareErrorMessage(errorMessage);
    expect(error).toBe('<p>The following validation occured:</p> <p>1.request is null</p>');
  });
});