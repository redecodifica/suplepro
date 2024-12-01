import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersUrl = 'http://localhost:8092/api/orders';
  private orderDetailsUrl = 'http://localhost:8092/api/order-details';

  constructor(private http: HttpClient) {}

  createOrder(order: any): Observable<any> {
    return this.http.post<any>(this.ordersUrl, order);
  }

  createOrderDetail(orderDetail: any): Observable<any> {
    return this.http.post<any>(this.orderDetailsUrl, orderDetail);
  }

  // Obtener todas las órdenes (para Solución 1)
  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.ordersUrl);
  }

  // Obtener órdenes por usuario
  getOrdersByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.ordersUrl}?cliente.id=${userId}`);
  }

  // Obtener detalles de una orden por ID
  getOrderDetailsByOrderId(orderId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.orderDetailsUrl}?pedido.id=${orderId}`);
  }
}