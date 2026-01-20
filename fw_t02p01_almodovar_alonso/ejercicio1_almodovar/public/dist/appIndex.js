"use strict";
console.log("Tema 2 - Ejercicio 1 - App Index");
// Actúa como orquestador de tu aplicación: inicializa servicios, configura el DOM, registra event listeners, etc.
document.addEventListener('DOMContentLoaded', async () => {
    const api = new ApiService();
    let arrayRecetasSinFormato = [];
    for (let i = 0; i < 8; i++) {
        arrayRecetasSinFormato.push(await api.obtenerRecetasAleatorias());
    }
    console.log(arrayRecetasSinFormato);
    pintarCards(arrayRecetasSinFormato);
});
async function pintarCards(arrayRecetasSinFormato) {
    let arrayRecetas = [];
    for (let i = 0; i < 8; i++) {
        arrayRecetas.push(arrayRecetasSinFormato[i][0].meals[0]);
    }
    const divContenedor = document.getElementById("cardRecetasAleatorias");
    let i = 0;
    let div = undefined;
    for (const receta of arrayRecetas) {
        if (i % 2 == 0) {
            div = document.createElement("div");
            div.classList.add("row");
        }
        divContenedor.appendChild(div);
        const carta = pintarCarta(receta, div);
        div.appendChild(carta);
        i++;
    }
}
function pintarCarta(receta, div) {
    const divCard = document.createElement("div");
    divCard.classList.add("card");
    divCard.classList.add("col-6");
    divCard.setAttribute('style', 'width: 18rem;');
    div.appendChild(divCard);
    const img = document.createElement("img");
    img.classList.add("card-img-top");
    img.src = receta.strMealThumb;
    img.alt = receta.strMeal;
    img.width = 200;
    divCard.appendChild(img);
    const divCardBody = document.createElement("div");
    divCardBody.classList.add("card-body");
    divCard.appendChild(divCardBody);
    const h5 = document.createElement("h5");
    h5.classList.add("card-title");
    h5.textContent = `${receta.strMeal}`;
    divCardBody.appendChild(h5);
    const pCategoria = document.createElement("p");
    pCategoria.classList.add("card-text");
    pCategoria.textContent = `Categoría: ${receta.strCategory}`;
    divCardBody.appendChild(pCategoria);
    const pPais = document.createElement("p");
    pPais.classList.add("card-text");
    pPais.textContent = `País: ${receta.strArea}`;
    divCardBody.appendChild(pPais);
    const pIngredientes = document.createElement("p");
    pIngredientes.classList.add("card-text");
    pIngredientes.textContent = `Nº de Ingredientes: `;
    const badgeNIngredientes = document.createElement("SPAN");
    badgeNIngredientes.classList.add("badge", "text-bg-primary");
    let nIngredientes = 0;
    for (let i = 1; i <= 20; i++) {
        const ingrediente = receta[`strIngredient${i}`];
        if (ingrediente && ingrediente.trim() !== "") {
            nIngredientes++;
        }
        else {
            break;
        }
    }
    const textoBadge = document.createTextNode(`${nIngredientes}`);
    badgeNIngredientes.appendChild(textoBadge);
    pIngredientes.appendChild(badgeNIngredientes);
    divCardBody.appendChild(pIngredientes);
    // const pNacimiento = document.createElement("p");
    // pNacimiento.classList.add("card-text");
    // pNacimiento.textContent = `Año de Nacimiento: ${receta.dateOfBirth}`;
    // divCardBody.appendChild(pNacimiento);
    return divCard;
}
//# sourceMappingURL=appIndex.js.map