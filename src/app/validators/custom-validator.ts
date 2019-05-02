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
    if(control.value!='' && control.parent.get('StartDate').value!=''){
    if(control.parent.get('StartDate').value<control.value){
        return null;
    }
    else{
        return { invalidEndDate: true };
    }}
}

// Validator to start date and end date
export function validateDate(startDate,endDate):boolean{
    if(startDate<endDate){
      return true;
    }
    return false;
  }
export function ValidateStartDate(control: AbstractControl) {
    if(control.value!='' &&control.parent.get('EndDate').value!=''){
    if(control.parent.get('EndDate').value>control.value){
        control.parent.get('EndDate').setErrors(null);
        return null;
    }else{
        control.parent.get('EndDate').setErrors({invalidEndDate:true});
        return null;
    }
    }else{
        return null;
    }
    return null;
}

export function ValidateSDate(control: AbstractControl) {
    if(control.value>control.parent.get('EndDate').value){
        return null;
    }else{
        return null;
    }
}
// Validator to renewal date
export function ValidateRenewalDate(control: AbstractControl) {
    if(control.value!='' && control.parent.get('EndDate').value!=''){
    if(control.parent.get('EndDate').value<control.value){
        console.log('ValidateRenewalDate',control);
        return null;
    }
    else{
        return { invalidRenewalDate: true };
    }}else{
        return null;
    }
}
