import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceComponent } from './workspace.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductComponent } from './components/product/product.component';
import { UserComponent } from './components/user/user.component';
import { OrderComponent } from './components/order/order.component';
import { HomeComponent } from './components/home/home.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    WorkspaceComponent,
    CategoryComponent,
    ProductComponent,
    UserComponent,
    OrderComponent,
    HomeComponent,

    ProductDetailsComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    WorkspaceRoutingModule
  ]
})
export class WorkspaceModule { 

}
