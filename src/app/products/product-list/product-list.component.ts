import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: any[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        // Convertir metaData de JSON a un objeto para cada producto
        this.products = data.map(product => {
          if (product.metaData) {
            product.metaData = JSON.parse(product.metaData);
          }
          return product;
        });
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }
}