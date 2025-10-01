import { Routes } from '@angular/router';
import { AddProductComponent } from './dashBord/component/add-product/add-product.component';
import { ProjectDashBordComponent } from './dashBord/component/project-dash-bord/project-dash-bord.component';
import { ProductsListComponent } from './products/product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailComponent } from './product-details/product-details.component';
export const routes: Routes = [
  {path:"product/:id",component:AddProductComponent},
  {path:"dashBord",component:ProjectDashBordComponent},
  {path:"cart",component:CartComponent},
  {path:"",component:ProductsListComponent},
  {path : "product/:id" , component : ProductDetailComponent}



];
