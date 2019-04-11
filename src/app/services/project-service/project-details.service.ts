import { Injectable } from '@angular/core';
import { ProjectDetails } from '../../models/ProjectDetails';
@Injectable({
  providedIn: 'root'
})
export class ProjectDetailsService {
  
    public PROJECT_DATA:ProjectDetails[]=[
    {projectId:1,projectTitle:'Enterceptor',startDate:new Date(),endDate:new Date(),tags:'ML,AI,Sentiment Analysis',isActive:true,projectLogo:null},
    {projectId:2,projectTitle:'CPQ',startDate:new Date(),endDate:new Date(),tags:'ML,AI,Sentiment Analysis',isActive:true,projectLogo:null},
    {projectId:3,projectTitle:'Go Karma',startDate:new Date(),endDate:new Date(),tags:'ML,AI,Sentiment Analysis',isActive:true,projectLogo:null},
    {projectId:4,projectTitle:'UFHT',startDate:new Date(),endDate:new Date(),tags:'ML,AI,Sentiment Analysis',isActive:true,projectLogo:null},
    {projectId:5,projectTitle:'Dammac',startDate:new Date(),endDate:new Date(),tags:'ML,AI,Sentiment Analysis',isActive:true,projectLogo:null},
    {projectId:6,projectTitle:'Trickle Up',startDate:new Date(),endDate:new Date(),tags:'ML,AI,Sentiment Analysis',isActive:true,projectLogo:null},
    {projectId:7,projectTitle:'Tiecon',startDate:new Date(),endDate:new Date(),tags:'ML,AI,Sentiment Analysis',isActive:true,projectLogo:null},
    {projectId:8,projectTitle:'Enterceptor',startDate:new Date(),endDate:new Date(),tags:'ML,AI,Sentiment Analysis',isActive:true,projectLogo:null},
    {projectId:9,projectTitle:'Enterceptor',startDate:new Date(),endDate:new Date(),tags:'ML,AI,Sentiment Analysis',isActive:true,projectLogo:null},
    {projectId:10,projectTitle:'Enterceptor',startDate:new Date(),endDate:new Date(),tags:'ML,AI,Sentiment Analysis',isActive:true,projectLogo:null},
    {projectId:11,projectTitle:'Enterceptor',startDate:new Date(),endDate:new Date(),tags:'ML,AI,Sentiment Analysis',isActive:true,projectLogo:null},
    {projectId:12,projectTitle:'Enterceptor',startDate:new Date(),endDate:new Date(),tags:'ML,AI,Sentiment Analysis',isActive:true,projectLogo:null},
    {projectId:13,projectTitle:'Enterceptor',startDate:new Date(),endDate:new Date(),tags:'ML,AI,Sentiment Analysis',isActive:true,projectLogo:null},
    {projectId:14,projectTitle:'Enterceptor',startDate:new Date(),endDate:new Date(),tags:'ML,AI,Sentiment Analysis',isActive:true,projectLogo:null},
    {projectId:15,projectTitle:'Enterceptor',startDate:new Date(),endDate:new Date(),tags:'ML,AI,Sentiment Analysis',isActive:true,projectLogo:null},
  ];
  constructor() { }

  getProject(projectId: number): ProjectDetails {
    let project:ProjectDetails=null;
    for(let i=0;i<this.PROJECT_DATA.length;i++){
      if(this.PROJECT_DATA[i].projectId==projectId){
        project=this.PROJECT_DATA[i];
        return project;
      }
    }
    return project;
  }
  
  addProject(project:ProjectDetails):boolean{
    let oldLength=this.PROJECT_DATA.length;
    project.projectId=oldLength+1;
    let newLength=this.PROJECT_DATA.push(project);
    if(oldLength<newLength){
      return true;
    }
    return false;
  }

}
