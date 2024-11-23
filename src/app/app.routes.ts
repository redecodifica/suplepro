import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SuplementosComponent } from './suplementos/suplementos.component';
import { BarritasysnacksComponent } from './barritasysnacks/barritasysnacks.component';
import { RopaComponent } from './ropa/ropa.component';
import { VitaminasComponent } from './vitaminas/vitaminas.component';
import { ConsejosdeexpertosComponent } from './consejosdeexpertos/consejosdeexpertos.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { CestaComponent } from './cesta/cesta.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { ContactanosComponent } from './contactanos/contactanos.component';

export const routes: Routes = [
{path:'',component:HomeComponent}, 
{path:'suplementos',component:SuplementosComponent}, 
{path:'barritasysnacks',component:BarritasysnacksComponent}, 
{path:'ropa',component:RopaComponent}, 
{path:'vitaminas',component:VitaminasComponent},
{path:'consejosdeexpertos',component:ConsejosdeexpertosComponent},
{path:'cuenta',component:CuentaComponent}, 
{path:'cesta',component:CestaComponent}, 
{path:'contactanos',component:ContactanosComponent},
{path:'ayuda',component:AyudaComponent},
];
