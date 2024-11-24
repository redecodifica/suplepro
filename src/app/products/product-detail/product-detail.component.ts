import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {

  product: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    const productSlug = this.route.snapshot.paramMap.get('slug');
    if (productSlug) {
      this.productService.getProducts().subscribe(
        (products) => {
          this.product = products.find(p => p.slug === productSlug);
        },
        (error) => {
          console.error('Error al obtener el producto:', error);
        }
      );
    }
  }
}