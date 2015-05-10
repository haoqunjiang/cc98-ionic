import Enum from 'symbol-enum'; // export enum

const ErrorCode = new Enum(
  'ACCESS_TOKEN_EXPIRED',
  'REFRESH_TOKEN_EXPIRED'
);

export default ErrorCode;
