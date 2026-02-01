"use strict";
console.log("Tema 2 - Ejercicio 1 - App Index");
// Actúa como orquestador de tu aplicación: inicializa servicios, configura el DOM, registra event listeners, etc.
document.addEventListener('DOMContentLoaded', async () => {
    const api = new ApiService();
    const view = new ViewService();
    const selectCategorias = document.getElementById("categoriasRecetas");
    await view.pintarSelect(selectCategorias, await api.obtenerCategorias());
    pintarRecetas(api, view, "0");
    selectCategorias?.addEventListener("change", async function () {
        pintarRecetas(api, view, selectCategorias.value);
    });
});
async function pintarRecetas(api, view, valorSelect) {
    const arrayRecetas = [];
    const divContenedor = document.getElementById("cardRecetasAleatorias");
    if (valorSelect !== "0") {
        const categoriaSeleccionada = valorSelect;
        const recetasCategoria = await api.filtrarRecetasPorCategoria(categoriaSeleccionada);
        for (let i = 0; i < recetasCategoria.length && i < 8; i++) {
            const receta = await api.obtenerReceta(recetasCategoria[i]);
            arrayRecetas.push(receta);
        }
    }
    else {
        for (let i = 0; i < 8; i++) {
            arrayRecetas.push(await api.obtenerRecetaAleatoria());
        }
    }
    view.pintarCards(arrayRecetas, divContenedor);
}
//# sourceMappingURL=appIndex.js.map