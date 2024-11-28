import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MetaService } from '../services/meta.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;
  shippingAddress: any = {
    calle: '',
    numero: '',
    distrito: '',
    provincia: '',
    pais: ''
  };
  formSubmitted: boolean = false; // Nueva variable para verificar el estado del formulario

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private orderService: OrderService,
    private metaService: MetaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartItems.reduce((acc, item) => acc + item.precio * item.quantity, 0);
  }

  createOrder(): void {
    this.formSubmitted = true; // Marcar que se intentó enviar el formulario

    if (!this.isShippingAddressValid()) {
      alert('Por favor, complete todos los campos de la dirección de envío.');
      return;
    }

    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      alert('Por favor, inicia sesión para completar la compra.');
      return;
    }

    // Crear la orden
    const order = {
      cliente: currentUser,
      estado: 'pendiente',
      total: this.total,
      fechaPedido: new Date().toISOString().split('T')[0],
      metaData: JSON.stringify({ envio: this.shippingAddress })
    };

    this.orderService.createOrder(order).subscribe(
      (createdOrder) => {
        // Guardar los detalles de la dirección de envío como un JSON estructurado
        const shippingMeta = {
          entityId: currentUser.id,
          entityType: 'user',
          clave: 'direccion_envio',
          valor: JSON.stringify(this.shippingAddress)
        };
        this.metaService.saveMeta(shippingMeta).subscribe();

        // Crear los detalles de la orden
        this.cartItems.forEach(item => {
          const orderDetail = {
            pedido: createdOrder,
            producto: item,
            cantidad: item.quantity,
            precio: item.precio * item.quantity
          };
          this.orderService.createOrderDetail(orderDetail).subscribe();
        });

        // Vaciar el carrito después de realizar la compra
        this.cartService.clearCart();
        alert('Compra realizada con éxito');
        this.router.navigate(['/cuenta']);
      },
      (error) => {
        console.error('Error al crear la orden:', error);
      }
    );
  }

  isShippingAddressValid(): boolean {
    return this.shippingAddress.calle && this.shippingAddress.numero && this.shippingAddress.distrito && this.shippingAddress.provincia && this.shippingAddress.pais;
  }
}
