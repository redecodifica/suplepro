import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: any[] = [];
  currentCategory: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.currentCategory = params.get('category');
      
      this.productService.getProducts().subscribe(
        (data) => {
          // Parsear metaData y filtrar los productos por categoría si currentCategory existe
          this.products = data.filter(product => {
            if (product.metaData) {
              try {
                const metaData = JSON.parse(product.metaData);
                if (this.currentCategory && metaData.categoria) {
                  return metaData.categoria === this.currentCategory;
                }
              } catch (error) {
                console.error('Error al parsear metaData:', error);
              }
            }
            // Si no hay categoría seleccionada, se muestran todos los productos
            return !this.currentCategory;
          });
        },
        (error) => {
          console.error('Error al obtener los productos:', error);
        }
      );
    });
  }
}