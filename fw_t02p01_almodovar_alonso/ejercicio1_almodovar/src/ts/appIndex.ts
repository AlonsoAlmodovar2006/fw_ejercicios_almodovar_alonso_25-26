console.log("Tema 2 - Ejercicio 1 - App Index");
// Actúa como orquestador de tu aplicación: inicializa servicios, configura el DOM, registra event listeners, etc.

document.addEventListener('DOMContentLoaded', async () => {
    const api: ApiService = new ApiService();
    const view: ViewService = new ViewService();

    const selectCategorias = document.getElementById("categoriasRecetas") as HTMLSelectElement | null;
    await view.pintarSelect(selectCategorias, await api.obtenerCategorias());

    pintarRecetas(api, view, "0");

    selectCategorias?.addEventListener("change", async function () {
        pintarRecetas(api, view, selectCategorias.value);
    });
});

async function pintarRecetas(api: ApiService, view: ViewService, valorSelect: string) {
    const arrayRecetas: MyMeal[] = [];
    const divContenedor = document.getElementById("cardRecetasAleatorias") as HTMLDivElement | null;
    if (valorSelect !== "0") {
        const categoriaSeleccionada: string = valorSelect;
        const recetasCategoria: string[] = await api.filtrarRecetasPorCategoria(categoriaSeleccionada);
        for (let i = 0; i < recetasCategoria.length && i < 8; i++) {
            const receta: MyMeal = await api.obtenerReceta(recetasCategoria[i]);
            arrayRecetas.push(receta);
        }
    } else {
        for (let i = 0; i < 8; i++) {
            arrayRecetas.push(await api.obtenerRecetaAleatoria());
        }
    }
    view.pintarCards(arrayRecetas, divContenedor);
}