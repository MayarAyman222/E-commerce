import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, RouterLink, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Product } from '../../interfaces/product';
import { DashBordServiceService } from '../../dashBord/service/dash-bord-service.service';
import { HomeComponent } from '../../home/home/home.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterLink, HttpClientModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  filtered: Product[] = [];
  categories: string[] = ['all'];
  searchText = '';
  selectedCategory = 'all';
  loading = false;
  errorMsg = '';

  quantityMap: { [key: number]: number } = {};


  constructor(private ps: DashBordServiceService, private router: Router,private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
    this.route.queryParams.subscribe(params => {
    if (params['category']) {
      this.selectedCategory = params['category'];
      this.applyFilters();
    }
  });
  }

  loadProducts() {
    this.loading = true;
    this.ps.getAllData().subscribe({
      next: (prods: Product[]) => {
        this.products = prods;
        this.applyFilters();
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Failed to load products.';
        this.loading = false;
      }
    });
  }

  loadCategories() {
    this.ps.getAllCategory().subscribe({
      next: (cats: any[]) => {
        this.categories = ['all', ...cats.map(c => c.name)];
      },
      error: () => { this.categories = ['all']; }
    });
  }

  applyFilters() {
    const q = this.searchText.trim().toLowerCase();
    this.filtered = this.products.filter(p => {
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);

      const matchesCategory =
        this.selectedCategory === 'all' || p.category?.name === this.selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }

  onSearchChange() { this.applyFilters(); }
  clearSearch() { this.searchText = ''; this.applyFilters(); }

  openProduct(p: Product) {
    this.router.navigate(['/products', p.id]);
  }


  setQuantity(productId: number, qty: number) {
    this.quantityMap[productId] = qty;
  }


  addProductToCart(product: Product) {
    const quantity = this.quantityMap[product.id] || 1;
    this.ps.addToCart(1, product.id, quantity).subscribe({
      next: () => {
        console.log('Added to cart:', product.title, 'Qty:', quantity);
        this.router.navigate(['/cart']);
      },
      error: err => console.error('Cart error:', err)
    });
  }


}

