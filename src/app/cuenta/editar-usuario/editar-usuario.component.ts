import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, RouterLink],
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  currentUser: any;
  updatedUser = {
    nombreUsuario: '',
    contrasena: ''
  };

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.updatedUser.nombreUsuario = this.currentUser.nombreUsuario;
    }
  }

  updateUser(): void {
    if (this.currentUser) {
      this.userService.updateUser(this.currentUser.id, this.updatedUser).subscribe(
        response => {
          // Actualizar la información localmente si la actualización fue exitosa
          const updatedUser = { ...this.currentUser, ...response };
          this.authService.setCurrentUser(updatedUser);
          alert('Usuario actualizado exitosamente');
          this.router.navigate(['/cuenta']);
        },
        error => {
          console.error('Error al actualizar el usuario:', error);
          alert('Hubo un problema actualizando el usuario. Inténtelo de nuevo.');
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/cuenta']);
  }
}