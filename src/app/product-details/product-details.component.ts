import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from '../interfaces/product';
import { DashBordServiceService } from '../dashBord/service/dash-bord-service.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule],  
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  selectedImage?: string;
  imageModalOpen = false;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashBordServiceService,
    private loc: Location
  ) {}

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

  goBack() {
    this.loc.back();
  }
}
