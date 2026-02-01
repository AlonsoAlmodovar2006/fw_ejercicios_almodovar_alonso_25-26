"use strict";
console.log("Tema 2 - Ejercicio 1 - Storage Service");
// Gestiona el acceso a localStorage
class StorageService {
    constructor() {
        // USER_MEAL_KEY_ITEM
        // …
        this.USER_KEY_ITEM = "usuarios";
        // Alta y validación de usuarios
        // Gestión de sesión
        // Guardar y recuperar recetas del usuario
        // Guardar y recuperar planes semanales
        // Guardar preferencias del usuario
        // …
        // Nunca toca el DOM
    }
    // ¿Constructor?
    // Responsabilidades
    guardarUsuarios(users) {
        const usuarios = JSON.stringify(users);
        localStorage.setItem(this.USER_KEY_ITEM, usuarios);
    }
    obtenerUsuarios() {
        const usuarios = localStorage.getItem(this.USER_KEY_ITEM);
        if (!usuarios)
            return [];
        return JSON.parse(usuarios);
    }
    registrarNuevoUsuario(nuevoUsuario) {
        const usuarios = this.obtenerUsuarios();
        usuarios.push(nuevoUsuario);
        this.guardarUsuarios(usuarios);
    }
    obtenerUltimoID() {
        const usuarios = this.obtenerUsuarios();
        if (usuarios.length == 0) {
            return 0;
        }
        else {
            const ultimoUsuario = usuarios[usuarios.length - 1];
            return ultimoUsuario.id;
        }
    }
    obtenerEmails() {
        const usuarios = this.obtenerUsuarios();
        return usuarios.map(usuario => usuario.email);
    }
}
//# sourceMappingURL=storageService.js.map