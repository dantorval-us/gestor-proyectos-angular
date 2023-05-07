import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {

  formReg: FormGroup;

  constructor(
    private authService: AuthService
  ) {
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  onSubmit() {
    console.log(this.formReg.value);
    this.authService.registrar(this.formReg.value)
      .then(response => {
        console.log(response)
      })
      .catch(error => console.log(error));
  }

}
