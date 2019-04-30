import { AbstractControl } from '@angular/forms';

// Validator to acept only numbers
export function ValidateContactNumber(control: AbstractControl) {
    let num=parseInt(control.value);
    if (isNaN(num)) {
        return { validUrl: true };
    }
    return null;
}

// Validator to start date and end date
export function ValidateEndDate(control: AbstractControl) {
    
    console.log(control);
    if(control.value!='' && control.parent.get('StartDate').value!=''){
    if(control.parent.get('StartDate').value<control.value){
        return null;
    }
    else{
        return { invalidEndDate: true };
    }}
}

// Validator to start date and end date
export function ValidateStartDate(control: AbstractControl) {
    console.log(control);
    if(control.value!='' &&control.parent.get('EndDate').value!=''){
    if(control.parent.get('EndDate').value>control.value){
        return null;
    }
    else{
        return { invalidStartDate: true };
    }}
}