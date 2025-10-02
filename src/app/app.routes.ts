import { Routes } from '@angular/router';
import { AddProductComponent } from './dashBord/component/add-product/add-product.component';
import { ProjectDashBordComponent } from './dashBord/component/project-dash-bord/project-dash-bord.component';
import { ProductsListComponent } from './products/product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailComponent } from './product-details/product-details.component';
import { HomeComponent } from './home/home.component';
export const routes: Routes = [
  {path:"addProduct/:id",component:AddProductComponent},
  {path:"dashBord",component:ProjectDashBordComponent},
  {path:"cart",component:CartComponent},
  {path:"products",component:ProductsListComponent},
  {path : "product/:id" , component :ProductDetailComponent},
  {path:"home",component:HomeComponent},
  {path:'',component:HomeComponent}



];
