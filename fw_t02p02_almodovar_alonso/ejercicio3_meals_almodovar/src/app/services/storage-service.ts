import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly USER_KEY_ITEM = "usuarios";

  // Usuarios
  guardarUsuarios(users: User[]): void {
    const usuarios: string = JSON.stringify(users);
    localStorage.setItem(this.USER_KEY_ITEM, usuarios);
  }

  obtenerUsuarios(): User[] {
    const usuarios: string | null = localStorage.getItem(this.USER_KEY_ITEM);
    if (!usuarios) return [];
    return JSON.parse(usuarios) as User[];
  }

  registrarNuevoUsuario(nuevoUsuario: User): boolean {
    const usuarios: User[] = this.obtenerUsuarios();
    usuarios.push(nuevoUsuario);
    this.guardarUsuarios(usuarios);
    return this.obtenerUltimoID() === nuevoUsuario.id;
  }

  obtenerUltimoID(): number {
    const usuarios: User[] = this.obtenerUsuarios();
    if (usuarios.length == 0) {
      return 0;
    } else {
      const ultimoUsuario = usuarios[usuarios.length - 1];
      return ultimoUsuario.id;
    }
  }

  obtenerEmails(): string[] {
    const usuarios: User[] = this.obtenerUsuarios();
    return usuarios.map(usuario => usuario.email);
  }

  // ¿Constructor?
  // Gestión de sesión
  // Guardar y recuperar recetas del usuario
  // Guardar y recuperar planes semanales
  // Guardar preferencias del usuario
  // …
}
