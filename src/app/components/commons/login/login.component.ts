import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AccountService } from '../../../services/account/account.service';
import { AuthService } from '../../../services/auth/auth.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {  
  constructor(
    private accountService: AccountService,
    private authService: AuthService
  ) { }

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  })

  handleSubmitLoginForm() {
    this.accountService.login(this.loginForm.getRawValue()).subscribe((result)=>{
      this.authService.setAuthToken(result.accessToken, result.tokenType);
      this.accountService.loginSuccess(result.role);
    },
    (error)=>{
      console.log(error);
    });
  }
}
