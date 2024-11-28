import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent implements OnInit {
  orderDetails: any[] = [];
  orderId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    // Obtener el ID del pedido desde la URL
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.orderId) {
      // Obtener los detalles del pedido filtrando por ID de pedido
      this.orderService.getOrderDetailsByOrderId(this.orderId).subscribe(
        (details) => {
          // Filtrar los detalles del pedido para incluir solo aquellos con el ID del pedido actual
          this.orderDetails = details.filter(detail => detail.pedido.id === this.orderId);
        },
        (error) => {
          console.error('Error al obtener los detalles del pedido:', error);
        }
      );
    }
  }
}