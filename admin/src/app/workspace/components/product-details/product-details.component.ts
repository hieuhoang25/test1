import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { ICategory } from 'src/app/model/category.model';
import { IProduct } from 'src/app/model/product.model';
import { NotFoundComponent } from 'src/app/not-found/not-found.component';
import { environment } from 'src/environments/environment';
import { CategoryService } from '../../service/category.service';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct = {
    idProduct:0,
    nameProduct:"",
    price:0,
    productPhoto:"",
    description:"",
    idProductStyle:0,
    idCategory:0,
    createDate:"" 
  };
  categories!: ICategory[];
  id_category!:number;
  category:ICategory ={
    idCategory:0 ,
    nameCategory:"",
     productStyles:[],
  } ;
  id_product_style!:number;
  constructor(
    private router: ActivatedRoute,
    private _productService: ProductService,
    private format: DatePipe,
    private categoryService: CategoryService
  ) {}
  showProductCategory(){
  this.categoryService.fetchOne(this.id_category).subscribe(data => {
    this.category = data;
    console.log(data)
  }, err=>{
    console.log(err);
  })
  }
  urlImage(url: string) {
    return (
      environment.prefix_firebase_cloud +
      url +
      environment.suffix_firebase_cloud
    );
  }
  ngOnInit(): void {
    this.categoryService.fetchAll().subscribe((data) => {
      this.categories = data;
    }, err => {
      console.log(err);
    })
    this._productService.fetchOne(this.router.snapshot.params['id']).subscribe(
      (data) => {
        data.createDate = this.format.transform(
          data.createDate,
          'yyyy-MM-dd HH:mm:ss'
        );
        console.log(data);
        this.product = data;
        this.id_category = data.idCategory;
       
        this.categoryService.fetchOne(this.id_category).subscribe(data => {
          this.category = data;
          console.log(data)
        }, err=>{
          console.log(err);
        })
        this.id_product_style = data.idProductStyle;
        document.getElementById('product_details')?.classList.remove('d-none');
      },
      (err) => {
        console.log(err);
        document.getElementById('notfound_product')?.classList.remove('d-none');
      }
    );
    console.log(this.router.snapshot.params['id']);
  }

  formatDate(string_date: string) {
    return this.format.transform(string_date, 'yyyy-MM-dd HH:mm:ss');
  }
}
