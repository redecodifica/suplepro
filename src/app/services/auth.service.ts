import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8092/api/users';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser$: Observable<any>;
  private redirectUrl: string | null = null; // Nueva propiedad para la URL de redirección

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  login(correo: string, contrasena: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?correo=${correo}&contrasena=${contrasena}`).pipe(
      map(users => {
        // Filtrar los usuarios que coincidan con el correo y la contraseña proporcionados
        const user = users.find(u => u.correo === correo && u.contrasena === contrasena);
        if (user) {
          this.setCurrentUser(user);

          // Redirigir al usuario según la URL almacenada (si existe)
          if (this.redirectUrl) {
            window.location.href = this.redirectUrl;
            this.redirectUrl = null; // Limpiar la URL de redirección después de usarla
          } else {
            window.location.href = '/cuenta'; // Redirigir a la página de cuenta por defecto
          }
        }
        return user ? user : null;
      })
    );
  }

  register(newUser: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, newUser);
  }

  setCurrentUser(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    window.location.href = '/';
  }

  setRedirectUrl(url: string): void {
    this.redirectUrl = url; // Establecer la URL a la cual redirigir después de iniciar sesión
  }

  getRedirectUrl(): string | null {
    return this.redirectUrl; // Obtener la URL de redirección
  }

  clearRedirectUrl(): void {
    this.redirectUrl = null; // Limpiar la URL de redirección después de usarla
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser(); // Devuelve true si hay un usuario autenticado
  }
}
