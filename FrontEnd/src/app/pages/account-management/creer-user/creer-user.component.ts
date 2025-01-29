import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HeaderComponent } from '../../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-creer-user',
  templateUrl: './creer-user.component.html',
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  standalone: true,
})
export class CreerUserComponent {
  userForm: FormGroup;
  errorMessage: string = '';

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      // numSecu: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      userType: ['patient', Validators.required],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.value).subscribe({
        next: () => this.router.navigate(['/account-management']),
        error: (error) => {
          this.errorMessage = 'Erreur lors de la création du compte';
          console.error(error);
        },
      });
    }
  }
}
