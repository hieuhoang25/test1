import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/model/product.model';
import { environment } from 'src/environments/environment';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: IProduct[] =[];
  page:number = 1;
  pageSize:number = 5;
  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    this._productService.fetchAll().subscribe(data => {
     this.products = data;
     console.log(data)
    },err=>{
        console.log(err);
    })
  }
  change(){
    console.log(this.page)
  }
  hideString(str:string){
    return str.substring(0, 10)+"..."
  }
  urlImage(url:string){
    return environment.prefix_firebase_cloud+url+environment.suffix_firebase_cloud;
  }
  search(input:any){
    this._productService.fetchAllLikeName(input.value).subscribe(data=>{
      this.products = data;
      console.log(data)
    },err=>{
      console.log(err);
    })
  }
}
