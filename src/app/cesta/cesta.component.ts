import { Component, OnInit } from '@angular/core'; 
import { HeaderComponent } from '../header/header.component';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
declare var $: any;

@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [HeaderComponent, CommonModule, RouterLink],
  templateUrl: './cesta.component.html',
  styleUrl: './cesta.component.css'
})
export class CestaComponent implements OnInit {

  cartItems: any[] = [];
  total: number = 0;

  constructor(private cartService: CartService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((items) => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce((acc, item) => acc + item.precio * item.quantity, 0);
  }

  updateQuantity(event: Event, productId: number): void {
    const inputElement = event.target as HTMLInputElement;
    const quantityNumber = parseInt(inputElement.value, 10);

    const item = this.cartItems.find(item => item.id === productId);
    if (item && quantityNumber > 0) {
      item.quantity = quantityNumber;
      this.cartService.updateCartItem(item);
      this.calculateTotal();
    } else if (item && quantityNumber === 0) {
      this.removeFromCart(productId);
    }
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.calculateTotal();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.calculateTotal();
  }

  proceedToCheckout(): void {
    if (this.authService.isAuthenticated()) {
      // Si el usuario está autenticado, navegar al checkout
      this.router.navigate(['/checkout']);
    } else {
      // Si no está autenticado, abrir el popup de autenticación y establecer la URL de redirección
      $('#authModal').modal('show');
      this.authService.setRedirectUrl('/checkout');
    }
  }
}
