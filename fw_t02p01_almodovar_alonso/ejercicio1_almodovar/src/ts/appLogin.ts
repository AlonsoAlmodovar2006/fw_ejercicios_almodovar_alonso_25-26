console.log("Tema 2 - Ejercicio 1 - Login");
document.addEventListener('DOMContentLoaded', () => {
    const localStorage: StorageService = new StorageService();
    const view: ViewService = new ViewService();

    const modal = document.getElementById("authModal") as HTMLDivElement;

    const divFormLogin = document.getElementById("login-pane") as HTMLDivElement | null;
    const formLogin = divFormLogin?.querySelector("form") as HTMLFormElement;
    const divFormRegister = document.getElementById("register-pane") as HTMLDivElement | null;
    const formRegister = divFormRegister?.querySelector("form") as HTMLFormElement | null;

    formRegister?.addEventListener('submit', (e: SubmitEvent) => {
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
                    } else {
                        console.error("No se encontró #alert-new-usuario en el DOM");
                    }
                }, 500);
            } else {
                formRegister.classList.add('was-validated')
            }
        }
    });

    formLogin.addEventListener('submit', (e: SubmitEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (formLogin.checkValidity()) {
            formLogin.classList.add('was-validated')
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
                    } else {
                        console.error("No se encontró #alert-login-usuario en el DOM");
                    }
                }, 500);
            } else {
                console.error("No hace bien el login")
                formLogin.classList.add('was-validated')
            }
        }
    });
});

function handleRegister(localStorage: StorageService, form: HTMLFormElement): boolean {
    let esValido: boolean = true;
    const inputEmail = document.getElementById("registerEmail") as HTMLInputElement;
    const inputName = document.getElementById("registerName") as HTMLInputElement;
    const inputPassword = document.getElementById("registerPassword") as HTMLInputElement;
    const inputRePassword = document.getElementById("re_registerPassword") as HTMLInputElement;

    const emails: string[] = localStorage.obtenerEmails();
    if (!emails.includes(inputEmail.value.toLowerCase())) {
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

function handleLogin(localStorage: StorageService, form: HTMLFormElement): boolean {
    let esValido: boolean = true;
    const emails: string[] = localStorage.obtenerEmails();
    const usuarios: User[] = localStorage.obtenerUsuarios();

    const inputEmail = document.getElementById("loginEmail") as HTMLInputElement;
    const inputPassword = document.getElementById("loginPassword") as HTMLInputElement;
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

function createLoginSession(userId: number, userName: string): void {
    const fechaLogin: Date = new Date();
    const session: AuthSession = new AuthSession(userId, userName, fechaLogin);
    // ¿Guardar la sesión en localStorage o en una cookie?
}

function createUser(localStorage: StorageService, userEmail: string, userName: string, userPassword: string) {
    let ultimoID: number = localStorage.obtenerUltimoID() + 1;
    const usuario: User = {
        id: ultimoID,
        name: userName,
        email: userEmail,
        password: userPassword,
        favoriteCategory: undefined
    };
    localStorage.registrarNuevoUsuario(usuario);
}