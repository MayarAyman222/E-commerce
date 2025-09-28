import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, Product } from '../../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class DashBordServiceService {
  apiUrl:string;
  categoryUrl:any;
  products:any;
  cartUrl:string;
  constructor(public http:HttpClient) {
    this.apiUrl="https://api.escuelajs.co/api/v1/products";

    this.categoryUrl=" https://api.escuelajs.co/api/v1/categories";
     this.cartUrl = "https://api.escuelajs.co/api/v1/carts";

  }

  getAllData(): Observable <Product[]>{
    return this.http.get <Product[]>(this.apiUrl);
  }

  deleteProduct(id:any){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getProductById(id:any){
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addproduct(product:any){
    return this.http.post(this.apiUrl,product);
  }

  editProduct(product:any,id:any){
    return this.http.put(`${this.apiUrl}/${id}`,product);
  }

  updateProduct(product:any){
    this.getAllData().subscribe({
      next:(res)=>{
        this.products=res;
      }
    })
    let index=this.products.findIndex((ele:any)=>ele.id==product.id);
    if(index!=-1){
      this.products[index]=product;
    }
  }

  getAllCategory(): Observable <Category[]>{
    return this.http.get <any> (this.categoryUrl);
  }
 addToCart(userId: number, productId: number, quantity: number) {
    const body = {
      userId: userId,
      products: [
        { id: productId, quantity: quantity }
      ]
    };
    return this.http.post(this.cartUrl, body);
  }
 


}


