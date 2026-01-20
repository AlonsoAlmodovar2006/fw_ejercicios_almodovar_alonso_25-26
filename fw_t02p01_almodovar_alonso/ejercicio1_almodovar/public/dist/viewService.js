"use strict";
console.log("Tema 2 - Ejercicio 1 - View Service");
// pinta la interfaz (vengan los datos de API o de localStorage)
class ViewService {
    constructor() {
        this.api = new ApiService();
        // Renderizar listados de recetas
        // Renderizar detalles de receta
        // Renderizar planes semanales
        // Mostrar mensajes de error o aviso
        // …
        // Las funciones siempre reciben el elemento contenedor del DOM y los datos a representar.
    }
    // Responsabilidades
    async mostrarCategorias(selectCategorias) {
        const categorias = await this.api.obtenerCategorias();
        console.log(categorias);
        categorias.forEach((categoria) => {
            const option = document.createElement("option");
            option.value = categoria.id;
            option.textContent = categoria.name;
            selectCategorias?.appendChild(option);
        });
    }
}
//# sourceMappingURL=viewService.js.map