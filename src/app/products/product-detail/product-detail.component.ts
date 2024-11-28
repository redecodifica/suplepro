import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { HeaderComponent } from '../../header/header.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {

  product: any;
  productAttributes: any[] = [];
  showAddedMessage: boolean = false; // Mostrar mensaje de confirmación

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService // Inyecta el servicio del carrito
  ) {}

  ngOnInit(): void {
    const productSlug = this.route.snapshot.paramMap.get('slug');
    if (productSlug) {
      this.productService.getProducts().subscribe(
        (products) => {
          this.product = products.find(p => p.slug === productSlug);
          if (this.product) {
            // Obtener los atributos meta del producto filtrando por entityType y entityId
            this.productService.getProductMeta(this.product.id, 'product').subscribe(
              (meta) => {
                this.productAttributes = meta.filter(attribute => 
                  attribute.entityType === 'product' && attribute.entityId === this.product.id
                );
              },
              (error) => {
                console.error('Error al obtener los atributos meta del producto:', error);
              }
            );
          }
        },
        (error) => {
          console.error('Error al obtener el producto:', error);
        }
      );
    }
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product);
      this.showAddedMessage = true;

      // Ocultar el mensaje después de 2 segundos
      setTimeout(() => {
        this.showAddedMessage = false;
      }, 2000);
    }
  }
}
