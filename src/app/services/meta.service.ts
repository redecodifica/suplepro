import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private apiUrl = 'http://localhost:8092/api/meta';

  constructor(private http: HttpClient) {}

  // Método para guardar los meta datos (dirección de envío, etc.)
  saveMeta(meta: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, meta);
  }
}