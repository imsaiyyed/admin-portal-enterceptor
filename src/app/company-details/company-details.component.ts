import { Component, OnInit, SimpleChanges, OnChanges } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm
} from "@angular/forms";
import { Validators } from "@angular/forms";
import countries from "../../assets/json/countries.json";
import states from "../../assets/json/states.json";
import cities from "../../assets/json/cities.json";

import { ValidateContactNumber } from "../validators/custom-validator";

@Component({
  selector: "app-company-details",
  templateUrl: "./company-details.component.html",
  styleUrls: ["./company-details.component.css"]
})
export class CompanyDetailsComponent implements OnInit {
  companyDetails = this.fb.group({
    companyName: ["", [Validators.required]],
    contact: ["", [Validators.required, ValidateContactNumber,Validators.minLength(10)]],
    email: ["", [Validators.required, Validators.email]],
    address: this.fb.group({
      country: ["", [Validators.required]],
      state: ["", [Validators.required]],
      city: ["", [Validators.required]],
      street: ["", [Validators.required]],
      zip: ["", [Validators.required]]
    })
  });
  isLoading = false;
  countries = Array();
  states = Array();
  cities = Array();
  countryCode: number;
  stateCode: number;
  constructor(private fb: FormBuilder) {
    this.countries = countries.countries;
    // this.states=states.states;
    // this.cities=cities.cities;
    console.log(this.countries);
  }
  ngOnInit() {
    this.onChanges();
  }

  onChanges(): void {
    this.companyDetails
      .get("address")
      .get("country")
      .valueChanges.subscribe(val => {
        console.log(val);
        this.states = states.states.filter(x => x.country_id == val);
        this.companyDetails
          .get("address")
          .get("state")
          .setValue(this.states[0].id);
      });

    this.companyDetails
      .get("address")
      .get("state")
      .valueChanges.subscribe(val => {
        console.log(val);
        this.cities = cities.cities.filter(
          x =>
            parseInt(x.state_id) == val &&
            this.companyDetails.get("address").get("country").value ==
              x.country_id
        );
        // this.companyDetails.get('address').get('city').setValue(this.cities[0].id);
      });
  }
  // ngOnChanges(changes: SimpleChanges): void {
  //   //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
  //   //Add '${implements OnChanges}' to the class.
  //   for (let propName in changes) {
  //     let chng = changes[propName];
  //     let cur  = JSON.stringify(chng.currentValue);
  //     let prev = JSON.stringify(chng.previousValue);
  //     console.log(chng,cur,prev);
  //     // this.changeLog.push(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
  //   }
  // }

  // ngOnChanges(changes: SimpleChanges) {

  // }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    // console.warn(this.companyDetails.value);
  }
}
