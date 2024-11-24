import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProductListComponent } from '../../products/product-list/product-list.component';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule,ProductListComponent, HeaderComponent],
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
  categorySlug: string | null = null;
  categoryName: string = 'Tienda';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categorySlug = params.get('category');
      if (this.categorySlug) {
        this.categoryName = this.categorySlug;
      } else {
        this.categoryName = 'Tienda';
      }
    });
  }
}