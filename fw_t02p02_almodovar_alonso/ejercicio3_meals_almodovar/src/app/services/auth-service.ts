import { inject, Injectable } from '@angular/core';
import { AuthSession } from '../model/auth-session';
import { StorageService } from './storage-service';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private localStorage = inject(StorageService);

  iniciarSesion(id: number, name: string): void {
    const fechaLogin: Date = new Date();
    const session: AuthSession = { userId: id, name: name, loginDate: fechaLogin };
    this.localStorage.crearSesion(session);
  }

  cerrarSesion(): void {
    this.localStorage.cerrarSesion();
  }

  obtenerSesion(): AuthSession | null {
    return this.localStorage.obtenerSesion();
  }

  obtenerUsuarioAutenticado(): User | undefined {
    const usuario = this.obtenerSesion();
    let usuarioAutenticado = undefined;
    if (usuario) usuarioAutenticado = this.localStorage.obtenerUsuarioPorId(usuario.userId);
    return usuarioAutenticado;
  }

  isAuthenticated(): boolean {
    return this.obtenerSesion() !== null;
  }
}
