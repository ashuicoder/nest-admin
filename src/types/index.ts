export interface IResponse<T = any> {
  code: number;
  message: string;
  data?: T;
}

export interface IPageRes<T> {
  total: number;
  pages: number;
  current: number;
  size: number;
  records: T[];
}
