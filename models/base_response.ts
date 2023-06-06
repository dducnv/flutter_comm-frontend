export interface BaseResponseModel<T> {
  message: string;
  httpStatus: string;
  data: T;
}
