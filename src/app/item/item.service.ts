import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, firstValueFrom, map, Observable, of, Subscribable, Subscription, tap } from 'rxjs';

export type Item = {
  id: number;
  name: string;
  description: string;
  price: number;
};

interface IItemComponent {
  addItem(data: Item): Observable<boolean>;
  getItems(): Observable<Item[] | undefined>;
  getItemById(id: number): Observable<Item | undefined>;
  updateItem(id: number, data: Item): Observable<boolean>;
  deleteItem(id: number): Observable<boolean | undefined>;
}

@Injectable({
  providedIn: 'root',
})
export class ItemService implements IItemComponent {
  private baseUri = 'http://localhost:3000/items'

  constructor(private http: HttpClient) { }

  addItem(data: Item): Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.baseUri}`, data, { headers }).pipe(
      map(() => true),
      catchError((error) => {
        console.error('Erro ao salvar item:', error);
        return of(false);
      })
    );
  }

  getItems(): Observable<Item[] | undefined> {
    return this.http.get<Item[]>(`${this.baseUri}`).pipe(
      catchError((error) => {
        console.error(error);
        return of(undefined);
      })
    );
  }

  getItemById(id: number): Observable<Item | undefined> {
    return this.http.get<Item>(`${this.baseUri}/${id}`).pipe(
      catchError((error) => {
        console.error(error);
        return of(undefined);
      })
    );
  }

  updateItem(id: number, data: Omit<Item, 'id'>): Observable<boolean> {
    return this.http.put(`${this.baseUri}/${id}`, data).pipe(
      map(() => {
        return true;
      }),
      catchError((error) => {
        console.error('Erro ao salvar item:', error);
        return of(false);
      })
    );
  }

  deleteItem(id: number): Observable<boolean | undefined> {
    return this.http.delete<boolean>(`${this.baseUri}/${id}`).pipe(
      map(() => {
        return true
      }),
      catchError((error) => {
        console.error(error);
        return of(undefined);
      })
    );
  }
}