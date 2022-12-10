import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  constructor() {}

  alphaNumericString(): ValidatorFn {
    
    return (control:AbstractControl) : ValidationErrors | null => {
      let errorMessage = "";
      const value = control.value;

      if (!value) {
          // return null;
          errorMessage = "This is a required field and it cannot be empty."
      }

      const isAlphaNumeric = /[^a-zA-Z0-9]/.test(value);
      // console.log("isAlphaNumeric",isAlphaNumeric);
      if(isAlphaNumeric) {
        errorMessage = "This field should only contain alphabets and numbers."
      }

      return isAlphaNumeric ? {isAlphaNumeric:errorMessage}: null;
  }
}

length7(): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {
    let errorMessage = "";
    const value = control.value;

    if (!value) {
        // return null;
        errorMessage = "This is a required field and it cannot be empty."
    }

    const valueIsOfLength7 = String(value).length !== 7;
    // console.log("valueIsOfLength7",valueIsOfLength7);
    if(valueIsOfLength7) {
      errorMessage = "This field should only contain 7 charecters."
    }

    return valueIsOfLength7 ? {valueIsOfLength7:errorMessage}: null;
}
}

}
