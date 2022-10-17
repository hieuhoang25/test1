import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISize } from 'src/app/model/size.model';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  constructor(private http: HttpClient) { }

  fetchAll(){
  return this.http.get<ISize[]>("api/v1/admin/sizes");
  }
  addSize(size: ISize) {
    return this.http.post("api/v1/admin/sizes",size);
  }
  deleteSize(id:number) {
    return this.http.delete("api/v1/admin/sizes/"+id);
  }
  
  updateSize(size: ISize) {
    return this.http.put("api/v1/admin/sizes",size);
  }
}
