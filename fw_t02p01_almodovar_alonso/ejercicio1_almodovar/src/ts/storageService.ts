console.log("Tema 2 - Ejercicio 1 - Storage Service");
// Gestiona el acceso a localStorage
class StorageService {
    // USER_MEAL_KEY_ITEM
    // …
    private readonly USER_KEY_ITEM = "usuarios";

    // ¿Constructor?

    // Responsabilidades
    // Alta y validación de usuarios
    guardarUsuarios(users: User[]): void {
        const usuarios: string = JSON.stringify(users);
        localStorage.setItem(this.USER_KEY_ITEM, usuarios);
    }

    obtenerUsuarios(): User[] {
        const usuarios: string | null = localStorage.getItem(this.USER_KEY_ITEM);
        if (!usuarios) return [];
        return JSON.parse(usuarios) as User[];
    }

    registrarNuevoUsuario(nuevoUsuario: User): void {
        const usuarios: User[] = this.obtenerUsuarios();
        usuarios.push(nuevoUsuario);
        this.guardarUsuarios(usuarios);
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

    // Gestión de sesión
    // Guardar y recuperar recetas del usuario
    // Guardar y recuperar planes semanales
    // Guardar preferencias del usuario
    // …

    // Nunca toca el DOM

}