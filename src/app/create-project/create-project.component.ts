import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { ProjectDetailsService } from "../services/project-service/project-details.service";
import { ProjectDetails } from "../models/ProjectDetails";
import {MatSnackBar} from '@angular/material';
import {ValidateEndDate,validateDate, ValidateStartDate} from '../validators/custom-validator';
@Component({
  selector: "app-create-project",
  templateUrl: "./create-project.component.html",
  styleUrls: ["./create-project.component.css"]
})
export class CreateProjectComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  isEdit=false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: Tag[] = [];
  projectDetails=this.fb.group({}) ;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar:MatSnackBar,
    private projectDetailsService: ProjectDetailsService
  ) {}

  ngOnInit() {
    let projectId = parseInt(this.route.snapshot.paramMap.get('projectId'));
    if(projectId==0){
      this.projectDetails= this.fb.group({
        ProjectTitle: ["", [Validators.required]],
        UserId: [1],
        StartDate: ["", [Validators.required,ValidateStartDate]],
        EndDate: ["", [Validators.required,ValidateEndDate]],
        IsActive: [true, [Validators.required]],
        Tags: ["", []]
      });
    }
    else{
      this.isEdit=true;
      let project:ProjectDetails;
      project=this.projectDetailsService.getProject(projectId);
      console.log(project.StartDate);

      this.projectDetails= this.fb.group({
        ProjectTitle: [project.ProjectTitle, [Validators.required]],
        UserId: [project.UserId],
        ProjectId:[project.ProjectId],
        StartDate: [project.StartDate, [Validators.required]],
        EndDate: [project.EndDate, [Validators.required]],
        IsActive: [project.IsActive, [Validators.required]],
        Tags: [project.Tags, []]
      });
      
      let startDate=new Date(project.StartDate);
      let endDate=new Date(project.EndDate);
      

      this.projectDetails.get('StartDate').setValue(startDate.toISOString().slice(0,10));
      this.projectDetails.get('EndDate').setValue(endDate.toISOString().slice(0,10));

      console.log(this.projectDetails.get('StartDate'));

      let stringTags=project.Tags.split(',');
      for(let i=0;i<stringTags.length-1;i++){
        this.tags.push({name:stringTags[i]})
      }
      
    }
   
    
  }
  onSubmit() {
  
    // if(validateDate(this.projectDetails.get('StartDate').value,this.projectDetails.get('EndDate').value)){
    // TODO: Use EventEmitter with form value
    let projectId = parseInt(this.route.snapshot.paramMap.get('projectId'));
    if(projectId==0){
      console.log(this.projectDetails.value);
      this.projectDetailsService.addProject(this.projectDetails.value).subscribe((resp)=>{
        console.log(resp);
      },(error)=>{
        console.log(error);
        if(error.statusText=='Created'){
          this.snackBar.open('Project added successfully...', 'Ok', {
            duration: 3000
          });
          this.router.navigate(['/project-details']);
        }
  
      });
    }else{
      this.projectDetailsService.updateProject(this.projectDetails.value).subscribe((resp)=>{
        console.log(resp);
      },(error)=>{
        console.log(error);
        if(error.statusText=='Created'){
          this.snackBar.open('Project updated successfully...', 'Ok', {
            duration: 3000
          });
          this.router.navigate(['/project-details']);
        }
      });
    }
  // }
  // else{
  //   this.projectDetails.get('EndDate').setErrors({invalidEndDate: true });
  // }
    console.log();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || "").trim()) {
      this.tags.push({ name: value.trim() });
    }
    let newValue = "";
    for (let i = 0; i < this.tags.length; i++) {
      newValue = newValue.concat(this.tags[i].name + ",");
      console.log(newValue);
      console.log(this.tags[i].name);
    }
    this.projectDetails.get("Tags").setValue(newValue);

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }
  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
  getErrorMessageEndDate(){
    console.log(this.projectDetails.get('EndDate'));
    return this.projectDetails.get('EndDate').hasError('required') ? 'You must enter a value' :
    this.projectDetails.get('EndDate').hasError('invalidEndDate') ? 'End date must be greater htan start date' :
        '';
  }
 

  // onFileChange(event) {
  //   const reader = new FileReader();

  //   if (event.target.files && event.target.files.length) {
  //     console.log(event.target.files);
  //     this.projectDetails.get("projectLogo").setValue(event.target.files[0]);
  //   }
  // }
}
export interface Tag {
  name: string;
}
