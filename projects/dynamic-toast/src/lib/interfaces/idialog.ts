export interface IErrorMessage {
  code: string;
  info?: Array<IErrorInfo>;
  message: string;
}


export interface IErrorInfo {
  code: string;
  message: string;
}