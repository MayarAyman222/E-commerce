import { Component, Input, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { DashBordServiceService } from '../dashBord/service/dash-bord-service.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';





@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor,FormsModule,CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  constructor(private ps: DashBordServiceService){}
//  products=[
//     { name: "Product 1", category: "Electronics", quantity: 1, price: 99.99, image_url: "favicon.ico" },
//     { name: "Product 2", category: "Clothing", quantity: 2, price: 49.99, image_url: "favicon.ico" },
//     { name: "Product 3", category: "Clothing", quantity: 3, price: 49.99, image_url: "favicon.ico" },
//     { name: "Product 4", category: "Clothing", quantity: 4, price: 49.99, image_url: "favicon.ico" },
//     { name: "Product 5", category: "Clothing", quantity: 5, price: 49.99, image_url: "favicon.ico" },
//     { name: "Product 6", category: "Clothing", quantity: 6, price: 49.99, image_url: "favicon.ico" },
//     { name: "Product 7", category: "Clothing", quantity: 7, price: 49.99, image_url: "favicon.ico" },
//     { name: "Product 8", category: "Clothing", quantity: 8, price: 49.99, image_url: "favicon.ico" },
//     { name: "Product 9", category: "Clothing", quantity: 9, price: 49.99, image_url: "favicon.ico" },
//     { name: "Product 10", category: "Clothing", quantity: 10, price: 49.99, image_url: "favicon.ico" },

// ];
total:any=0;
shipping:number=10.00;
tax:number=20.00

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

removeItem(productId: number) {
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
}