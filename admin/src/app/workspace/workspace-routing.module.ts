import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { OrderComponent } from './components/order/order.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductComponent } from './components/product/product.component';
import { UserComponent } from './components/user/user.component';
import { WorkspaceComponent } from './workspace.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, title: 'Dashboard' },
  { path: 'category', component: CategoryComponent, title: 'Category' },
  { path: 'products', component: ProductComponent , title: 'Product'},
  { path: 'products/:id', component: ProductDetailsComponent , title: 'Product'},
  { path: 'user', component: UserComponent , title: 'User'},
  { path: 'order', component: OrderComponent, title: 'Order'},
  { path: '', component: HomeComponent, title: 'Home'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule { }
