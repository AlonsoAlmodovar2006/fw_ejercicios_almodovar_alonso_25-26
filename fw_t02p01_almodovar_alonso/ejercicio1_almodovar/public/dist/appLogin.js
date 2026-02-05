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
        e.stopPropagation();
        if (formRegister.checkValidity()) {
            if (handleRegister(localStorage, formRegister)) {
                formRegister.reset();
                formRegister.classList.remove('was-validated');
                view.ocultarModal(modal);
                setTimeout(() => {
                    const alertUsuario = document.getElementById('alert-new-usuario');
                    if (alertUsuario) {
                        alertUsuario.classList.remove('d-none');
                        setTimeout(() => {
                            alertUsuario.classList.add('d-none');
                        }, 3000);
                    }
                    else {
                        console.error("No se encontró #alert-new-usuario en el DOM");
                    }
                }, 500);
            }
            else {
                formRegister.classList.add('was-validated');
            }
        }
    });
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (formLogin.checkValidity()) {
            formLogin.classList.add('was-validated');
            if (handleLogin(localStorage, formLogin)) {
                formLogin.reset();
                formLogin.classList.remove('was-validated');
                view.ocultarModal(modal);
                setTimeout(() => {
                    const alertUsuario = document.getElementById('alert-login-usuario');
                    if (alertUsuario) {
                        alertUsuario.classList.remove('d-none');
                        setTimeout(() => {
                            alertUsuario.classList.add('d-none');
                        }, 3000);
                    }
                    else {
                        console.error("No se encontró #alert-login-usuario en el DOM");
                    }
                }, 500);
            }
            else {
                console.error("No hace bien el login");
            }
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
function handleLogin(localStorage, form) {
    let esValido = true;
    const emails = localStorage.obtenerEmails();
    const usuarios = localStorage.obtenerUsuarios();
    const inputEmail = document.getElementById("loginEmail");
    const inputPassword = document.getElementById("loginPassword");
    if (!emails.includes(inputEmail.value.toLowerCase())) {
        inputEmail.setCustomValidity("Por favor, ingresa un email válido y único");
        form.classList.add("was-validated");
        esValido = false;
    }
    const usuario = usuarios.find(user => user.email.toLowerCase() === inputEmail.value.toLowerCase());
    if (usuario && usuario.password !== inputPassword.value) {
        inputPassword.setCustomValidity("Contraseña incorrecta");
        form.classList.add("was-validated");
        esValido = false;
    }
    if (esValido && usuario) {
        createLoginSession(usuario.id, usuario.name);
    }
    return esValido;
}
function createLoginSession(userId, userName) {
    const fechaLogin = new Date();
    const session = new AuthSession(userId, userName, fechaLogin);
    // ¿Guardar la sesión en localStorage o en una cookie?
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