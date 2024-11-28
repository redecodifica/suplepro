import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.css'
})
export class AuthModalComponent implements OnInit {
  showLogin: boolean = true;
  errorMessage: string = '';

  loginData = { correo: '', contrasena: '' };
  registerData = { nombreUsuario: '', correo: '', contrasena: '', rol: 'cliente' };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Escuchar el evento de cierre del modal para limpiar los formularios
    $('#authModal').on('hidden.bs.modal', () => {
      this.clearForms();
    });
  }

  switchToRegister(): void {
    this.showLogin = false;
  }

  switchToLogin(): void {
    this.showLogin = true;
  }

  login(): void {
    this.authService.login(this.loginData.correo, this.loginData.contrasena).subscribe(
      user => {
        if (user) {
          this.authService.setCurrentUser(user);
          $('#authModal').modal('hide'); // Cerrar el modal con jQuery

          // Redirigir según la URL de redirección
          const redirectUrl = this.authService.getRedirectUrl();
          if (redirectUrl) {
            this.authService.clearRedirectUrl();
            this.router.navigateByUrl(redirectUrl); // Redirigir al checkout
          } else {
            this.router.navigate(['/cuenta']); // Redirigir al usuario a la cuenta por defecto
          }
        } else {
          this.errorMessage = 'Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.';
        }
      },
      error => {
        this.errorMessage = 'Error al intentar iniciar sesión. Inténtalo de nuevo más tarde.';
      }
    );
  }

  register(): void {
    this.authService.register(this.registerData).subscribe(
      user => {
        this.authService.setCurrentUser(user);
        $('#authModal').modal('hide'); // Cerrar el modal con jQuery

        // Redirigir según la URL de redirección
        const redirectUrl = this.authService.getRedirectUrl();
        if (redirectUrl) {
          this.authService.clearRedirectUrl();
          this.router.navigateByUrl(redirectUrl); // Redirigir al checkout
        } else {
          this.router.navigate(['/cuenta']); // Redirigir al usuario a la cuenta por defecto
        }
      },
      error => {
        this.errorMessage = 'Error al intentar registrarse. Inténtalo de nuevo más tarde.';
      }
    );
  }

  // Método para limpiar los campos de los formularios
  clearForms(): void {
    this.loginData = { correo: '', contrasena: '' };
    this.registerData = { nombreUsuario: '', correo: '', contrasena: '', rol: 'cliente' };
    this.errorMessage = '';
  }
}
