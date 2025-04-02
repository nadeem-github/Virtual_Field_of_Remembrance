import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VirtualFieldAPIsService {

  private baseURL = 'http://localhost:8002/api/admin/'; // Base URL
  // private baseURL = 'http://50.6.202.250:8002/api/admin/'; // Base URL

  constructor(private http: HttpClient) { }

  getRemembrances(data: any): Observable<any> {
    const url = `${this.baseURL}fetch-remebrance`;
    return this.http.post<any>(url, data).pipe(
      catchError(this.handleError)
    );
  }

  addNewRemembrances(data: FormData): Observable<any> {
    const url = `${this.baseURL}create-remebrance`;
    return this.http.post<any>(url, data).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => new Error('Something went wrong with the API.'));
  }
  
}
