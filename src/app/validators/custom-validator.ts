import { AbstractControl } from '@angular/forms';

// Validator to acept only numbers
export function ValidateContactNumber(control: AbstractControl) {
    let num=parseInt(control.value);
    if (isNaN(num)) {
        return { validUrl: true };
    }
    return null;
}