import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConsejosdeexpertosComponent } from './consejosdeexpertos/consejosdeexpertos.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { CestaComponent } from './cesta/cesta.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { ContactanosComponent } from './contactanos/contactanos.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { CategoryDetailComponent } from './categories/category-detail/category-detail.component';


export const routes: Routes = [
{path:'',component:HomeComponent}, 
{path:'consejosdeexpertos',component:ConsejosdeexpertosComponent},
{path:'cuenta',component:CuentaComponent}, 
{path:'cesta',component:CestaComponent}, 
{path:'contactanos',component:ContactanosComponent},
{path:'ayuda',component:AyudaComponent},
{path: 'products', component: ProductListComponent },
{ path: 'producto/:slug', component: ProductDetailComponent },
{ path: 'tienda', component: CategoryDetailComponent },
{ path: 'tienda/categoria/:category', component: CategoryDetailComponent },
];
