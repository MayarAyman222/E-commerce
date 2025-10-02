import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProjectDashBordComponent } from './dashBord/component/project-dash-bord/project-dash-bord.component';
import { ProductsListComponent } from './products/product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailComponent } from './product-details/product-details.component';
import { NavBarComponent } from "./nav-bar/nav-bar.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProjectDashBordComponent, ProductsListComponent, CartComponent, ProductDetailComponent, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ourShop';
}
