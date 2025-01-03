import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../components/header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creer-user',
  templateUrl: './creer-user.component.html',
  imports: [ReactiveFormsModule, HeaderComponent],
  standalone: true
})
export class CreerUserComponent {
  userForm: FormGroup;

  constructor(public fb: FormBuilder,public router: Router) {
    this.userForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      numSecu: ['', Validators.required], 
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required], 
      userType: ['patient', Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.router.navigate(['/account-management']);
    }
  }
}
