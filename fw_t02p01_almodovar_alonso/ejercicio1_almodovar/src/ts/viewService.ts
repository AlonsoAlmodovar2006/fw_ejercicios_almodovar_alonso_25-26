console.log("Tema 2 - Ejercicio 1 - View Service");
// pinta la interfaz (vengan los datos de API o de localStorage)
class ViewService {
    api: ApiService = new ApiService();

    // Responsabilidades
    async mostrarCategorias(selectCategorias: HTMLSelectElement | null) {
        const categorias = await this.api.obtenerCategorias();
        console.log(categorias);
        categorias.forEach((categoria) => {
            const option = document.createElement("option");
            option.value = categoria.id;
            option.textContent = categoria.name;
            selectCategorias?.appendChild(option);
        });
    }

    // Renderizar listados de recetas
    // Renderizar detalles de receta
    // Renderizar planes semanales
    // Mostrar mensajes de error o aviso
    // …
    // Las funciones siempre reciben el elemento contenedor del DOM y los datos a representar.
}
