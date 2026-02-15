import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { StorageService } from '../../services/storage-service';
import { AuthService } from '../../services/auth-service';
import { User } from '../../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private localStorage = inject(StorageService);
  private router = inject(Router);
  private authService = inject(AuthService);

  registerForm: FormGroup;
  loginForm: FormGroup;
  public registroExitoso = false;
  public submitted = false;
  public errorRegistro = '';

  constructor() {
    this.registerForm = this.fb.group({
      registerName: ['', [Validators.required, Validators.minLength(3)]],
      registerEmail: ['', [Validators.required, Validators.email, this.emailUnicoValidator.bind(this)]],
      registerPassword: ['', [Validators.required, Validators.minLength(3)]],
      re_registerPassword: ['', [Validators.required, Validators.minLength(3)]],
    },
      { validators: this.passwordsCoinciden.bind(this) },
    );
    this.loginForm = this.fb.group({
      loginEmail: ['', [Validators.required, Validators.email]],
      loginPassword: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  submitRegister() {
    this.submitted = true;
    this.errorRegistro = '';

    let ultimoID: number = this.localStorage.obtenerUltimoID() + 1;

    if (this.registerForm.valid) {
      const nuevoUsuario: User = {
        id: ultimoID,
        name: this.registerForm.value.registerName,
        email: this.registerForm.value.registerEmail,
        password: this.registerForm.value.registerPassword,
        favoriteCategory: null,
      };

      const success = this.localStorage.registrarNuevoUsuario(nuevoUsuario);

      if (success) {
        this.registroExitoso = true;
        this.registerForm.reset();
        this.submitted = false;
        this.router.navigate(['/'], {
          state: { message: 'register_ok' }
        });
      } else {
        this.errorRegistro = 'Error al registrar el usuario. Por favor, inténtalo de nuevo.';
      }
    }
  }

  submitLogin() {
    this.submitted = true;
    this.errorRegistro = '';

    if (this.loginForm.valid) {
      const email = this.loginForm.value.loginEmail;
      const password = this.loginForm.value.loginPassword;

      const usuario: User | undefined = this.localStorage.obtenerUsuarioPorCorreo(email);

      if (usuario && usuario.password === password) {
        this.authService.iniciarSesion(usuario.id, usuario.name);
        this.registroExitoso = true;
        this.registerForm.reset();
        this.submitted = false;
        this.router.navigate(['/'], {
          state: { message: 'login_ok' }
        });
      } else {
        this.errorRegistro = 'Usuario y Contraseña no válidos';
      }
    }
  }

  public passwordsCoinciden(group: AbstractControl): ValidationErrors | null {
    const password = group.get('registerPassword')?.value;
    const confirmPassword = group.get('re_registerPassword')?.value;
    return password === confirmPassword ? null : { passwordsNoCoinciden: true };
  }

  public emailUnicoValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const emails: string[] = this.localStorage.obtenerEmails();
    const emailExiste = emails.includes(control.value.toLowerCase());
    return emailExiste ? { emailDuplicado: true } : null;
  }

  public get registerName() {
    return this.registerForm.get('registerName');
  }

  public get registerEmail() {
    return this.registerForm.get('registerEmail');
  }

  public get registerPassword() {
    return this.registerForm.get('registerPassword');
  }

  public get re_registerPassword() {
    return this.registerForm.get('re_registerPassword');
  }

  public get loginEmail() {
    return this.loginForm.get('loginEmail');
  }

  public get loginPassword() {
    return this.loginForm.get('loginPassword');
  }

  public getValidationClass(control: AbstractControl | null): string {
    if (!this.submitted) {
      return '';
    }
    if (!control) {
      return '';
    }
    if (control.valid) {
      return 'is-valid';
    }
    return 'is-invalid';
  }

  public getValidationClassConfirmPassword(): string {
    if (!this.submitted) {
      return '';
    }

    if (!this.re_registerPassword) {
      return '';
    }

    if (this.re_registerPassword.errors) {
      return 'is-invalid';
    }

    if (this.registerForm.errors?.['passwordsNoCoinciden']) {
      return 'is-invalid';
    }

    return 'is-valid';
  }
}
