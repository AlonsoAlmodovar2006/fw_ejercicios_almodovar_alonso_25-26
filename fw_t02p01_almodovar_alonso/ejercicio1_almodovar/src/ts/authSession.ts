console.log("Tema 2 - Ejercicio 1 - Auth Session");
// Representa la sesión del usuario autenticado. 
// Podría también ser una interfaz
class AuthSession {
    userId: number;
    name: string;
    loginDate: Date;
    // ¿NO/SÍ cerrar sesión? Pensarlo.

    constructor (id:number, nam:string, date: Date) {
        this.userId = id;
        this.name = nam;
        this.loginDate = date;
    }
}