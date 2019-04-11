import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { ProjectDetailsService } from "../services/project-service/project-details.service";
import { ProjectDetails } from "../models/ProjectDetails";

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
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: Tag[] = [];
  projectDetails ;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projectDetailsService: ProjectDetailsService
  ) {}

  ngOnInit() {
    let projectId = parseInt(this.route.snapshot.paramMap.get('projectId'));
    if(projectId==0){
      this.projectDetails= this.fb.group({
        projectTitle: ["", [Validators.required]],
        projectLogo: ["", [Validators.required]],
        startDate: ["", [Validators.required]],
        endDate: ["", [Validators.required]],
        isActive: ["", [Validators.required]],
        tags: ["", [Validators.required]]
      });
    }
    else{
      let project:ProjectDetails;
      project=this.projectDetailsService.getProject(projectId);
      this.projectDetails= this.fb.group({
        projectTitle: [project.projectTitle, [Validators.required]],
        projectLogo: ["", [Validators.required]],
        startDate: [project.startDate, [Validators.required]],
        endDate: [project.endDate, [Validators.required]],
        isActive: [project.isActive, [Validators.required]],
        tags: [project.tags, [Validators.required]]
      });
      let stringTags=project.tags.split(',');
      for(let i=0;i<stringTags.length;i++){
        this.tags.push({name:stringTags[i]})
      }
      
      console.log(project);
    }
   
    
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.projectDetails.value);
    console.log(this.projectDetailsService.addProject(this.projectDetails.value));
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
    this.projectDetails.get("tags").setValue(newValue);

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
  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      console.log(event.target.files);
      this.projectDetails.get("projectLogo").setValue(event.target.files[0]);
    }
  }
}
export interface Tag {
  name: string;
}
