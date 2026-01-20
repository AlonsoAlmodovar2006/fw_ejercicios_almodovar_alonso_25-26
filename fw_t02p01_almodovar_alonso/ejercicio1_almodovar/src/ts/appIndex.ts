console.log("Tema 2 - Ejercicio 1 - App Index");
// Actúa como orquestador de tu aplicación: inicializa servicios, configura el DOM, registra event listeners, etc.

document.addEventListener('DOMContentLoaded', async () => {
    const api: ApiService = new ApiService();
    const view: ViewService = new ViewService();

    const selectCategorias = document.getElementById("categoriasRecetas") as HTMLSelectElement | null;
    await view.mostrarCategorias(selectCategorias);

    selectCategorias?.addEventListener("change", async function () {
        const arrayRecetasSinFormato: MyMeal[][] = [];

        if (selectCategorias.value !== "0") {
            const categoriaSeleccionada = selectCategorias.value;
            for (let i = 0; i < 20 && arrayRecetasSinFormato.length < 8; i++) {
                const receta = await api.obtenerRecetasAleatorias();
                if (receta[0].category === categoriaSeleccionada) {
                    arrayRecetasSinFormato.push(receta);
                }
            }
        } else {
            for (let i = 0; i < 8; i++) {
                arrayRecetasSinFormato.push(await api.obtenerRecetasAleatorias());
            }
        }
        pintarCards(arrayRecetasSinFormato);
    })

});


async function pintarCards(arrayRecetasSinFormato: MyMeal[][]): Promise<void> {
    let arrayRecetas: MyMeal[] = [];
    for (let i = 0; i < 8; i++) {
        arrayRecetas.push(arrayRecetasSinFormato[i][0]);
    }

    const divContenedor = document.getElementById("cardRecetasAleatorias");

    divContenedor?.classList.add("row", "g-4", "gy-5");

    arrayRecetas.forEach((receta) => {
        const carta = pintarCarta(receta);
        divContenedor?.appendChild(carta);
    });
}

function pintarCarta(receta: MyMeal): HTMLDivElement {
    const divCard = document.createElement("div");
    divCard.classList.add("col-lg-3", "col-md-6", "col-12");

    const card = document.createElement("div");
    card.classList.add("card", "h-100", "shadow-sm", "border-0");
    card.style.width = "100%";
    divCard.appendChild(card);

    const img = document.createElement("img");
    img.classList.add("card-img-top");
    img.src = receta.image_medium;
    img.alt = receta.name;
    img.style.objectFit = "cover";
    img.style.height = "200px";
    card.appendChild(img);

    const divCardBody = document.createElement("div");
    divCardBody.classList.add("card-body", "d-flex", "flex-column");
    card.appendChild(divCardBody);

    const h5Name = document.createElement("h5");
    h5Name.classList.add("card-title", "fw-bold", "text-primary");
    h5Name.textContent = receta.name;
    divCardBody.appendChild(h5Name);

    const pCategoria = document.createElement("p");
    pCategoria.classList.add("card-text", "mb-2");
    pCategoria.innerHTML = `<span class="badge bg-info text-dark">${receta.category}</span>`;
    divCardBody.appendChild(pCategoria);

    const pPais = document.createElement("p");
    pPais.classList.add("card-text", "mb-2");
    pPais.innerHTML = `<i class="bi bi-geo-alt-fill text-danger me-2"></i><strong>${receta.area} food</strong>`;
    divCardBody.appendChild(pPais);

    const badgeNIngredientes = document.createElement("SPAN");
    badgeNIngredientes.classList.add("badge", "bg-success");
    badgeNIngredientes.textContent = receta.ingredients.length.toString();

    const pIngredientes = document.createElement("p");
    pIngredientes.classList.add("card-text",);
    pIngredientes.textContent = `Ingredients: `;

    pIngredientes.appendChild(badgeNIngredientes)
    divCardBody.appendChild(pIngredientes);

    return divCard;
}
