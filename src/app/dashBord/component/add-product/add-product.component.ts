import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { DashBordServiceService } from '../../service/dash-bord-service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { title } from 'process';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  productId:any;
  productData:any={
  title: "",
  price:null,
  description: "A description",
  categoryId: 0,
  images: [""]
}
myCategory:any;

  constructor(public service:DashBordServiceService,public activatedRoat:ActivatedRoute,public router:Router){
    this.productId = Number(this.activatedRoat.snapshot.params['id']);

}
  ngOnInit(): void {
    console.log(this.productId)

    this.getAllCategory();
  if (this.productId != 0) {
    this.service.getProductById(this.productId).subscribe({
      next: (res) => {console.log(res);
        this.productData = res
        this.productData.categoryId = res
      },
      error: (err) => {alert("error")
        console.log("error")

      }
    });
  }
  if(this.productId!=0){
      console.log(this.productData)
    }
}
getAllCategory(){
    this.service.getAllCategory().subscribe({
      next:(res)=>{
        console.log(res);
        this.myCategory=res;
      },
      error:(err)=>{
        console.log(err);
      }
    }
  )
  }

onSubmit(form: any) {
  if (form.valid) {

    const body = {
    title: this.productData.title,
    price: Number(this.productData.price),
    description: this.productData.description || "No description",
    categoryId: Number(this.productData.categoryId),
    images: [this.productData.images[0]]
  };
    if (this.productId == 0) {

      console.log(body);
      this.service.addproduct(body).subscribe({
        next: () => this.router.navigate(['/dashBord']),
        error: (err) => console.error("Add product error:", err)
      });
    } else {
      // const body = {
      //   title: this.productData.title,
      //   price: Number(this.productData.price)
      // };
      this.service.editProduct(body,Number (this.productId)

      ).subscribe({
        next: () => this.router.navigate(['/dashBord']),
        error: (err) => console.error("Edit product error:", err)
      });
    }
  }
}


}
