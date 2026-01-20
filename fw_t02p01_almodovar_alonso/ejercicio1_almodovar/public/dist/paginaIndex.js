"use strict";
document.addEventListener('DOMContentLoaded', async () => {
});
async function pintarCards(personajes) {
    const cardSectionBienvenida = document.getElementById("cardSectionBienvenida");
    let i = 0;
    let div = undefined;
    for (const personaje of personajes) {
        if (i % 2 == 0) {
            div = document.createElement("div");
            div.classList.add("row");
        }
        cardSectionBienvenida.appendChild(div);
        const carta = pintarCarta(personaje, div);
        div.appendChild(carta);
        i++;
    }
}
function pintarCarta(personaje, div) {
    const divCard = document.createElement("div");
    divCard.classList.add("card");
    divCard.classList.add("col-6");
    divCard.setAttribute('style', 'width: 18rem;');
    div.appendChild(divCard);
    const img = document.createElement("img");
    img.classList.add("card-img-top");
    img.src = personaje.image;
    img.alt = personaje.name;
    img.width = 200;
    divCard.appendChild(img);
    const divCardBody = document.createElement("div");
    divCardBody.classList.add("card-body");
    divCard.appendChild(divCardBody);
    const h5 = document.createElement("h5");
    h5.classList.add("card-title");
    h5.textContent = `${personaje.name}`;
    divCardBody.appendChild(h5);
    const pCasa = document.createElement("p");
    pCasa.classList.add("card-text");
    pCasa.textContent = `Casa: ${personaje.house}`;
    divCardBody.appendChild(pCasa);
    const pPatronus = document.createElement("p");
    pPatronus.classList.add("card-text");
    pPatronus.textContent = `Patronus: ${personaje.patronus}`;
    divCardBody.appendChild(pPatronus);
    const pEspecie = document.createElement("p");
    pEspecie.classList.add("card-text");
    pEspecie.textContent = `Especie: ${personaje.species}`;
    divCardBody.appendChild(pEspecie);
    const pNacimiento = document.createElement("p");
    pNacimiento.classList.add("card-text");
    pNacimiento.textContent = `Año de Nacimiento: ${personaje.dateOfBirth}`;
    divCardBody.appendChild(pNacimiento);
    return divCard;
    /* <div class="card" style="width: 18rem;">
            <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div> */
}
//# sourceMappingURL=paginaIndex.js.map