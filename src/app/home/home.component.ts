import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { DashBordServiceService } from '../dashBord/service/dash-bord-service.service';
import { Category } from '../interfaces/product';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,CommonModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
 categoryList: (Category & { loading?: boolean; hasValidImage?: boolean })[] = [];

  checkedcategory:any;
 

  constructor(public service:DashBordServiceService,public router:Router){

  }
  loading = true;
  ngOnInit(): void {
      this.getAllCategory()
     this.service.getAllCategory().subscribe((data: Category[]) => {
    // مبدئياً الكروت مش ظاهرة (hasValidImage = false)
    this.categoryList = data.map(c => ({ ...c, hasValidImage: false }));

    this.categoryList.forEach((cat, index) => {
      this.checkImage(cat.image).then(ok => {
        if (ok) {
          // أول ما الصورة تتأكد، نخلي الكارت ظاهر
          this.categoryList[index] = { ...cat, hasValidImage: true };
        } else {
          // لو بايظة نشيله من الليست
          this.categoryList.splice(index, 1);
        }
      });
    });
  });
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
private checkImage(url: string): Promise<boolean> {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

}
