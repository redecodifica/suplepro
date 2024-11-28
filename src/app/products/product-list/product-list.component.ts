import { Component, Input, OnInit } from '@angular/core';
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
  categories: any[] = [];
  @Input() currentCategory: string | null = null;
  @Input() cantidad: number | null = null; // Cantidad opcional de productos a mostrar

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    // Primero obtenemos las categorías para usar sus nombres legibles
    this.productService.getCategories().subscribe(categoriesData => {
      this.categories = categoriesData;
      
      this.route.paramMap.subscribe(params => {
        this.currentCategory = params.get('category');

        this.productService.getProducts().subscribe(
          (data) => {
            // Parsear metaData para todos los productos
            let parsedProducts = data.map(product => {
              if (product.metaData) {
                try {
                  product.metaData = JSON.parse(product.metaData); // Convertir metaData en un objeto
                  // Encontrar el nombre de la categoría desde el slug usando la lista de categorías
                  const category = this.categories.find(cat => cat.slug === product.metaData.categoria);
                  if (category) {
                    product.nombreCategoria = category.nombre; // Agregar el nombre legible de la categoría al producto
                  }
                } catch (error) {
                  console.error('Error al parsear metaData:', error);
                }
              }
              return product;
            });

            // Filtrar los productos por categoría si `currentCategory` existe
            if (this.currentCategory) {
              parsedProducts = parsedProducts.filter(product => product.metaData?.categoria === this.currentCategory);
            }

            // Si `cantidad` está definida, limitar el número de productos mostrados
            if (this.cantidad) {
              parsedProducts = parsedProducts.slice(0, this.cantidad);
            }

            this.products = parsedProducts;
          },
          (error) => {
            console.error('Error al obtener los productos:', error);
          }
        );
      });
    });
  }
}