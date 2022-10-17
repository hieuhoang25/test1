import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  upload(file:File) {
    var data = new FormData();
    data.append("file", file, file.name);
    return this.http.post("/api/v1/admin/upload", data);
  }
}
