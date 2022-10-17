import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IColor } from 'src/app/model/color.model';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  addColor(arg0: { idColor: null; nameColor: string; }) {
    return this.http.post("/api/v1/admin/colors",arg0);

  }
  update(arg0: { idColor: number; nameColor: string; }) {
    return this.http.put("/api/v1/admin/colors",arg0);

  }
 

  constructor(private http: HttpClient) { }
  fetchAll(){
   return this.http.get<IColor[]>("/api/v1/admin/colors");
  }
  delete(id:any){
    return this.http.delete("api/v1/admin/colors/"+id);
  }
  
}
