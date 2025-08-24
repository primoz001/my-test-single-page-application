import { inject, Injectable } from '@angular/core';
import { BOOKS_API_URL } from '../constants/main-constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/main-models';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private httpClient: HttpClient = inject(HttpClient);

  /**
   * Call books API
   * @returns {Observable<Book[]>}
   */
  getBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(BOOKS_API_URL);
  }

}
