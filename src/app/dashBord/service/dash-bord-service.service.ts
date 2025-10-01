import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category, Product } from '../../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class DashBordServiceService {
  apiUrl:string;
  categoryUrl:any;
  products:any;
  cartUrl:string;
  private cart: any[] = [];
   private cartSubject = new BehaviorSubject<any[]>([]);
  constructor(public http:HttpClient) {
    this.apiUrl="https://api.escuelajs.co/api/v1/products";

    this.categoryUrl=" https://api.escuelajs.co/api/v1/categories";
     this.cartUrl = "https://api.escuelajs.co/api/v1/orders/add-item";

     const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
      this.cartSubject.next([...this.cart]);
    }

  }

  getAllData(): Observable <Product[]>{
    return this.http.get <Product[]>(this.apiUrl);
  }

  deleteProduct(id:any){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getProductById(id:any): Observable<Product>{
    return this.http.get <Product>(`${this.apiUrl}/${id}`);
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
addToCart(product: any, quantity: number = 1) {
  this.cart.push({ ...product, quantity }); 
  localStorage.setItem('cart', JSON.stringify(this.cart));
  this.cartSubject.next([...this.cart]);
}
getCart(): Observable<any[]> {
  return this.cartSubject.asObservable();
}

  clearCart() {
     this.cart = [];
    localStorage.removeItem('cart');
    this.cartSubject.next([]);
  }

 updateQuantity(productId: number, quantity: number) {
  const item = this.cart.find(p => p.id === productId);
  if (item) {
    item.quantity = quantity;
  }
  localStorage.setItem('cart', JSON.stringify(this.cart));
  this.cartSubject.next([...this.cart]);  // ✅ تحديث
}

removeFromCart(productId: number) {
  this.cart = this.cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(this.cart));
  this.cartSubject.next([...this.cart]); 
}


}


