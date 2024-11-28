import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { CartService } from './services/cart.service';
declare var $: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,CommonModule, AuthModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  currentUser: any;
  cartItemCount: number = 0;

  constructor(private authService: AuthService, private cartService: CartService) {}
  

  ngOnInit(): void {
    // Suscribirse a los cambios del usuario
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    this.cartService.cart$.subscribe(items => {
      this.cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);
    });
  }

  openAuthModal(): void {
    // Mostrar el modal utilizando jQuery
    $('#authModal').modal('show');
  }

  logout(): void {
    this.authService.logout();
  }
}
