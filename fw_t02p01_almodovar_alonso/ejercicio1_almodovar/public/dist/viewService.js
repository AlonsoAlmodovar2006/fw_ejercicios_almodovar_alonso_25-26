"use strict";
console.log("Tema 2 - Ejercicio 1 - View Service");
class ViewService {
    // Responsabilidades
    async pintarSelect(select, array) {
        array.forEach((item) => {
            const option = document.createElement("option");
            option.value = item;
            option.textContent = item;
            select?.appendChild(option);
        });
    }
    async pintarCards(arrayRecetas, divContenedor) {
        if (divContenedor) {
            divContenedor.innerHTML = "";
        }
        divContenedor?.classList.add("row", "g-4", "gy-5");
        arrayRecetas.forEach((receta) => {
            const carta = this.pintarCard(receta);
            divContenedor?.appendChild(carta);
        });
    }
    pintarCard(receta) {
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
        pIngredientes.classList.add("card-text");
        pIngredientes.textContent = `Ingredients: `;
        pIngredientes.appendChild(badgeNIngredientes);
        divCardBody.appendChild(pIngredientes);
        return divCard;
    }
    ocultarModal(modal) {
        if (modal) {
            const modalInstance = bootstrap.Modal.getOrCreateInstance(modal);
            modalInstance.hide();
        }
    }
}
//# sourceMappingURL=viewService.js.map