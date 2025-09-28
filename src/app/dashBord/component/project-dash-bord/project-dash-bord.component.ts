import { Component, OnInit } from '@angular/core';
import { DashBordServiceService } from '../../service/dash-bord-service.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-project-dash-bord',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-dash-bord.component.html',
  styleUrl: './project-dash-bord.component.css'
})
export class ProjectDashBordComponent implements OnInit{
  myproduct:any;
  
  constructor(public service:DashBordServiceService){}
  ngOnInit(): void {
    console.log("ngOnInit called")
    this.getAll();
  }

  getAll(){
    this.service.getAllData().subscribe({
      next:(res)=>{
        console.log(res);
        this.myproduct=res;
      },
      error:(err)=>{
        console.log(err);
      }
    }
  )
  }


  deleteProduct(id:any){
    this.service.deleteProduct(id).subscribe({
      next:res=>{
        this.myproduct=this.myproduct.filter((ele:any)=>ele.id!=id)
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }
}


