"use strict";
console.log("Tema 2 - Ejercicio 1 - User Meal");
// Representa la relación entre un usuario y una receta guardada.
// Si una receta no está en UserMeal, el usuario no la ha guardado.
var Status;
(function (Status) {
    Status[Status["QUIERO_HACERLA"] = 0] = "QUIERO_HACERLA";
    Status[Status["LA_HE_HECHO"] = 1] = "LA_HE_HECHO";
})(Status || (Status = {}));
//# sourceMappingURL=userMeal.js.map