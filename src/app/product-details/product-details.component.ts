import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from '../interfaces/product';
import { DashBordServiceService } from '../dashBord/service/dash-bord-service.service';
import { CartComponent } from '../cart/cart.component';
import { ProductsListComponent } from '../products/product-list/product-list.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
declare var bootstrap: any;


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],  
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  selectedImage?: string;
  imageModalOpen = false;
  loading = false;
  error = ''; 
      @ViewChild('liveToast', { static: true }) liveToast!: ElementRef;
  
  toastMessage = '';


  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashBordServiceService,
    private loc: Location,
    private http :HttpClient
  ) {}
   quantityMap: { [key: number]: number } = {};

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetch(+id);
    }
  }

  fetch(id: number) {
    this.loading = true;
    this.dashboardService.getProductById(id).subscribe({
      next: (p: Product) => {
        this.product = p;
        this.selectedImage = p.images?.length ? p.images[0] : '';
        this.loading = false;
      },
      error: () => {
        this.error = 'Could not load product.';
        this.loading = false;
      }
    });
  }

  openImage(img?: string) {
    this.selectedImage = img;
    this.imageModalOpen = true;
  }

  closeModal() {
    this.imageModalOpen = false;
  }
 setQuantity(productId: number, qty: number) {
  this.quantityMap[productId] = qty;
}
  goBack() {
    this.loc.back();
  }
  addToCart(productId: number) {
  const qty = this.quantityMap[productId] || 1;

  this.http.get(`https://api.escuelajs.co/api/v1/products/${productId}`)
    .subscribe((product: any) => {
      this.dashboardService.addToCart(product, qty);
      console.log(`Added to cart: ${product.title}, Qty: ${qty}`);
       this.toastMessage = `${product.title} Added to cart(${qty}) ✅`;
        this.showToast();
                      this.quantityMap[productId] = 1;

    });
}
showToast() {
    const toastEl = this.liveToast.nativeElement;
    const toast = new bootstrap.Toast(toastEl, { delay: 2000 });
    toast.show();
  }
}
