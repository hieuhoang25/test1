import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from 'src/app/model/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  fetchAll() {
    return this.http.get<ICategory[]>("/api/v1/admin/categories");
  }
  fetchOne(id:number){
    return this.http.get<ICategory>("/api/v1/admin/categories/"+id);
  }

}
