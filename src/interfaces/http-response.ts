export interface HttpResponse<T> {
  data: T;
  message: string;
  error?: string;
}
