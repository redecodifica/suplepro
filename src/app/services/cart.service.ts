import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsInCart: any[] = [];
  private cartSubject = new BehaviorSubject<any[]>(this.getItemsFromLocalStorage());

  cart$ = this.cartSubject.asObservable();

  constructor() {
    this.itemsInCart = this.getItemsFromLocalStorage();
    this.cartSubject.next(this.itemsInCart);
  }

  // Método para obtener los productos del carrito
  getCartItems(): any[] {
    return this.itemsInCart;
  }

  addToCart(product: any): void {
    const itemIndex = this.itemsInCart.findIndex(item => item.id === product.id);
    if (itemIndex > -1) {
      // Si el producto ya está en el carrito, incrementa la cantidad
      this.itemsInCart[itemIndex].quantity += 1;
    } else {
      // Si el producto no está en el carrito, añádelo con cantidad 1
      this.itemsInCart.push({ ...product, quantity: 1 });
    }
    this.updateLocalStorage();
    this.cartSubject.next(this.itemsInCart);
  }

  updateCartItem(product: any): void {
    const itemIndex = this.itemsInCart.findIndex(item => item.id === product.id);
    if (itemIndex > -1) {
      this.itemsInCart[itemIndex] = product;
      this.updateLocalStorage();
      this.cartSubject.next(this.itemsInCart);
    }
  }

  removeFromCart(productId: number): void {
    this.itemsInCart = this.itemsInCart.filter(item => item.id !== productId);
    this.updateLocalStorage();
    this.cartSubject.next(this.itemsInCart);
  }

  clearCart(): void {
    this.itemsInCart = [];
    this.updateLocalStorage();
    this.cartSubject.next(this.itemsInCart);
  }

  private updateLocalStorage(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.itemsInCart));
  }

  private getItemsFromLocalStorage(): any[] {
    const storedItems = localStorage.getItem('cartItems');
    return storedItems ? JSON.parse(storedItems) : [];
  }
}