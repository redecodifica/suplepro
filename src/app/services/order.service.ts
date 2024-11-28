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

  // Método para obtener los pedidos de un usuario específico
  getOrdersByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.ordersUrl}?cliente.id=${userId}`);
  }

  // Método para obtener los detalles de una orden específica por su ID
  getOrderDetailsByOrderId(orderId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.orderDetailsUrl}?pedido.id=${orderId}`);
  }
}
