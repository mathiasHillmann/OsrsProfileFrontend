import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface HttpError {
  error: string | null;
  message: string;
}

export interface HttpResponse<T> {
  data: T;
  message: string | null;
}

export enum HttpMethod {
  Get = 'get',
  Post = 'post',
  Delete = 'delete',
  Put = 'put',
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private apiUrl: string;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.apiUrl = environment.apiUrl;
  }

  public request<T = any>(
    method: HttpMethod,
    route: string,
    body?: Record<string, any>
  ): Observable<T | any> {
    return this.http
      .request<HttpResponse<T>>(method, `${this.apiUrl}\/api\/${route}`, {
        responseType: 'json',
        body,
      })
      .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse): Observable<HttpError> {
    return new Observable<HttpError>((subscriber) => {
      switch (error.status) {
        case 0:
        case HttpStatusCode.GatewayTimeout:
          subscriber.error({
            message: 'Could not connect to the API',
            error: null,
          });
          break;

        case HttpStatusCode.BadRequest:
          subscriber.error({
            message: error.message,
            error: error.error,
          });
          break;

        case HttpStatusCode.TooManyRequests:
          subscriber.error({
            message: 'Too many attempts, please try again in a minute',
            error: error.error,
          });
          break;

        default:
          subscriber.error({
            message: 'An uknown error occured in the API',
            error: error.error,
          });
          break;
      }
    });
  }

  public defaultErrorHandling(error: HttpError): void {
    this.snackBar.open(error.message, undefined, {
      duration: 5000,
      panelClass: 'error-snackbar',
    });
  }
}
