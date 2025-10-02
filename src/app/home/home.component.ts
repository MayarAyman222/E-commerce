import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { DashBordServiceService } from '../dashBord/service/dash-bord-service.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,CommonModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  categoryList:any;
  checkedcategory:any;
 

  constructor(public service:DashBordServiceService,public router:Router){

  }
  ngOnInit(): void {
    this.getAllCategory()
  }
  getAllCategory(){
    this.service.getAllCategory().subscribe({
      next:(res)=>{
        console.log(res);
        this.categoryList=res;
      },
      error:(err)=>{
        console.log(err);
      }
    }
  )
  }
onClick(c:any){
  this.checkedcategory=c;
  this.router.navigate(['/products'], { queryParams: { category: c.name } });
}
hideProduct(product: any) {
  product.show = false;
}

}
