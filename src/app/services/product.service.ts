import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8092/api/products';
  private categoryUrl = 'http://localhost:8092/api/categories';
  private metaUrl = 'http://localhost:8092/api/meta';

  constructor(private http: HttpClient) { }

  /* TODOS LOS PRODUCTOS */
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  /* PRODUCTOS POR CATEGORIAS */
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.categoryUrl);
  }

  getProductsByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?category=${category}`);
  }

  /* META DE PRODUCTOS */
  getProductMeta(entityId: number, entityType: string): Observable<any[]> {
    const params = new HttpParams()
      .set('entityId', entityId)
      .set('entityType', entityType);
    return this.http.get<any[]>(this.metaUrl, { params });
  }
  
}