import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class GenericService<T> {
  constructor(
    protected http: HttpClient,
    private baseUrl: string 
  ) { }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl);
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`);
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(this.baseUrl, item);
  }

  // Objeto y Id
  update(id: number, item: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${id}`, item);
  }

  // Solo objeto
  // update(item: T): Observable<T> {
  //   return this.http.put<T>(`${this.baseUrl}`, item);
  // }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}