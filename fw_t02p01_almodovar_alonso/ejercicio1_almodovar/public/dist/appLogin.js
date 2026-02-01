"use strict";
console.log("Tema 2 - Ejercicio 1 - Login");
document.addEventListener('DOMContentLoaded', () => {
    const localStorage = new StorageService();
    const view = new ViewService();
    const modal = document.getElementById("authModal");
    const divFormLogin = document.getElementById("login-pane");
    const formLogin = divFormLogin?.querySelector("form");
    const divFormRegister = document.getElementById("register-pane");
    const formRegister = divFormRegister?.querySelector("form");
    formRegister?.addEventListener('submit', (e) => {
        e.preventDefault();
        if (handleRegister(localStorage, formRegister)) {
            formRegister.reset();
            formRegister.classList.remove('was-validated');
            view.ocultarModal(modal);
            setTimeout(() => {
                const alertUsuario = document.getElementById('alert-usuario');
                if (alertUsuario) {
                    alertUsuario.classList.remove('d-none');
                    setTimeout(() => {
                        alertUsuario.classList.add('d-none');
                    }, 3000);
                }
                else {
                    console.error("No se encontró #alert-usuario en el DOM");
                }
            }, 500);
        }
    });
});
function handleRegister(localStorage, form) {
    let esValido = true;
    const inputEmail = document.getElementById("registerEmail");
    const inputName = document.getElementById("registerName");
    const inputPassword = document.getElementById("registerPassword");
    const inputRePassword = document.getElementById("re_registerPassword");
    const emails = localStorage.obtenerEmails();
    if (emails.includes(inputEmail.value.toLowerCase())) {
        inputEmail.setCustomValidity("Por favor, ingresa un email válido y único");
        form.classList.add("was-validated");
        esValido = false;
    }
    if (inputPassword.value !== inputRePassword.value) {
        inputRePassword.setCustomValidity("Las contraseñas no coinciden o no son válidas");
        form.classList.add("was-validated");
        esValido = false;
    }
    if (esValido) {
        createUser(localStorage, inputEmail.value, inputName.value, inputPassword.value);
    }
    return esValido;
}
function createUser(localStorage, userEmail, userName, userPassword) {
    let ultimoID = localStorage.obtenerUltimoID() + 1;
    const usuario = {
        id: ultimoID,
        name: userName,
        email: userEmail,
        password: userPassword,
        favoriteCategory: undefined
    };
    localStorage.registrarNuevoUsuario(usuario);
}
//# sourceMappingURL=appLogin.js.map