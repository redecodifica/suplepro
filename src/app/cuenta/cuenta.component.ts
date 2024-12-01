import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-cuenta',
  standalone: true,
  imports: [HeaderComponent, CommonModule, RouterModule],
  templateUrl: './cuenta.component.html',
  styleUrl: './cuenta.component.css'
})
export class CuentaComponent implements OnInit {
  user: any;
  orders: any[] = [];

  constructor(
    private authService: AuthService, 
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  
    if (this.user) {
      this.orderService.getOrders().subscribe(
        (orders) => {
          // Filtrar solo las órdenes que pertenecen al usuario actual
          this.orders = orders.filter(order => order.cliente.id === this.user.id);
        },
        (error) => {
          console.error('Error al obtener las órdenes del usuario:', error);
        }
      );
    }
  }

  logout(): void {
    this.authService.logout();
    this.user = null;
    this.router.navigate(['/']); // Redirigir al usuario a la página principal
  }
}