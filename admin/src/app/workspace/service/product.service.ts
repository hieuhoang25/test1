import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from 'src/app/model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  fetchAll(){
    return this.http.get<IProduct[]>("/api/v1/admin/products");
  }
  fetchAllLikeName(query:string){
    return this.http.get<IProduct[]>("/api/v1/admin/products?q="+query);
  }
  fetchOne(id:string){
    return this.http.get<any>("/api/v1/admin/products/"+id);
  }
}
