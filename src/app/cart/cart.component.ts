import { Component, Input, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { DashBordServiceService } from '../dashBord/service/dash-bord-service.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";





@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, FormsModule, CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  constructor(private ps: DashBordServiceService){}

total:any=0;
// shipping:number=10.00;
// tax:number=20.00

cartItems: any[] = [];

ngOnInit() {
  this.ps.getCart().subscribe(items => {
    this.cartItems = items;
    this.calculateTotal();
    console.log('🛒 Cart Updated:', this.cartItems);
  });
}


   subtotal() {
  return this.cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
}


 increment(item: any) {
  item.quantity++;
  this.ps.updateQuantity(item.id, item.quantity);
  this.calculateTotal();
}

 decrement(item: any) {
  if (item.quantity > 1) {
    item.quantity--;
    this.ps.updateQuantity(item.id, item.quantity);
    this.calculateTotal();
  }
}

// removeItem(productId: number) {
//   this.ps.removeFromCart(productId);
//   this.cartItems = this.cartItems.filter(item => item.id !== productId);
//   this.calculateTotal();
// }
removeItem(productId: number) {
  // const re=this.q
  this.ps.removeFromCart(productId);
  this.cartItems = this.cartItems.filter(item => item.id !== productId);
  this.calculateTotal();
  
    
}

  clearCart() {
    this.ps.clearCart();
    this.cartItems = [];
    this.total = 0;
  
  }

calculateTotal() {
  const subtotal = this.cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  this.total = subtotal + this.shipping + this.tax;
}
get shipping() {
  return this.cartItems.length > 0 ? 10 : 0;   
}

get tax() {
  return this.cartItems.length > 0 ? 20 : 0;   
}

}