import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() breadcrumb: string = ''; // Texto para el breadcrumb
  @Input() title: string = '';      // Título principal de la página    
}
