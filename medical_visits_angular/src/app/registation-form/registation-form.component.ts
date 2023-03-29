import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-registation-form',
  templateUrl: './registation-form.component.html',
  styleUrls: ['./registation-form.component.css']
})
export class RegistationFormComponent {
  dateOfBirth: Date;
  selectedSex: string;

  constructor(private apiService: ApiService) {
    this.dateOfBirth = new Date();
    this.selectedSex = '';
  }

  gender = [
    {id: '1', value: 'Male'},
    {id: '2', value: 'Female'}
  ];

  calculateBirthdate(form: NgForm) {
    const patientControls = form.form.controls['patient'] as FormGroup;
    const pesel = patientControls.value.pesel;

    if (pesel && pesel.length === 11) {
      const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
      let sum = 0;
      for (let i = 0; i < 10; i++) {
        sum += Number(pesel.charAt(i)) * weights[i];
      }
      const controlNumber = (10 - (sum % 10)) % 10;
      if (controlNumber === Number(pesel.charAt(10))) {
        let year = Number(pesel.substring(0, 2));
        let month = Number(pesel.substring(2, 4));
        let day = Number(pesel.substring(4, 6));
        let century = 19;
        if (month > 20 && month < 33) {
          century = 20;
          month -= 20;
        } else if (month > 40 && month < 53) {
          century = 21;
          month -= 40;
        } else if (month > 60 && month < 73) {
          century = 22;
          month -= 60;
        } else if (month > 80 && month < 93) {
          century = 18;
          month -= 80;
        }
        const fullYear = century * 100 + year;
        this.dateOfBirth = new Date(fullYear, month - 1, day + 1);
        const age = Math.floor((Date.now() - this.dateOfBirth.getTime()) / (1000 * 60 * 60 * 24 * 365));

        if(age < 18){
          patientControls.controls['pesel'].setErrors({ 'underage': true });
          return;
        }

        patientControls.controls['birthDate'].setValue(this.dateOfBirth.toISOString().substring(0, 10));
        patientControls.controls['age'].setValue(age);

        const gender = Number(pesel.charAt(9));
        if (gender % 2 === 0) {
          patientControls.controls['gender'].setValue('Female');
          this.selectedSex = 'Female';
        } else {
          patientControls.controls['gender'].setValue('Male');
          this.selectedSex = 'Male';
        }
      } else {
        patientControls.controls['pesel'].setErrors({ 'invalid': true });
      }
    }
  }

  validatePasswords(form: NgForm) {
    const patientControls = form.form.controls['loginData'] as FormGroup;
    const password = patientControls.controls['password'].value;
    const confirmPassword = patientControls.controls['confirmPassword'].value;
    if (password !== confirmPassword) {
      patientControls.controls['confirmPassword'].setErrors({ notMatch: true });
    } else {
      patientControls.controls['confirmPassword'].setErrors(null);
    }
  }

  onSubmit(form: NgForm){
      console.log(form.value);
      this.apiService.registerPatient(form).subscribe(response => console.log(response));
  }

  // onSubmit(form: NgForm){
  //   const patient = {
  //     firstName: form.value.firstName,
  //     lastName: form.value.lastName,
  //     pesel: form.value.pesel,
  //     birthDate: this.dateOfBirth,
  //     sex: this.selectedSex,
  //     phoneNr: form.value.phoneNumber
  //   };
  //   const loginData = {
  //     email: form.value.email,
  //     password: form.value.password
  //   };
  //   const addressData = {
  //     country: form.value.country,
  //     city: form.value.city,
  //     street: form.value.street,
  //     houseNr: form.value.houseNumber,
  //     apartmentNr: form.value.aparmentNumber,
  //     postalCode: form.value.zipCode
  //   };
  //   const data ={
  //     patient,
  //     loginData,
  //     addressData
  //   };

  //   console.log(data);
  // }
}
