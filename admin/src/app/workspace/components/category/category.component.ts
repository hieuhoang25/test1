import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/alert.service';
import { ICategory } from 'src/app/model/category.model';
import { IColor } from 'src/app/model/color.model';
import { ISize } from 'src/app/model/size.model';
import { CategoryService } from '../../service/category.service';
import { ColorService } from '../../service/color.service';
import { SizeService } from '../../service/size.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categories: ICategory[] = [];
  sizes: ISize[] = [];
  colors: IColor[] = [];
  name_size:string = "";
  name_color:string = "";
  name_color_update:string = ""
  name_size_update:string = "";
  size_update!:ISize;
  color_update!:IColor;
  constructor(
    private categoryService: CategoryService,
    private sizeService: SizeService,
    private colorService: ColorService,
    private alertService: AlertService
  ) {}
  loadCategories(){
    this.categoryService.fetchAll().subscribe(
      (data) => {
        this.categories = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  loadSizes(){
    this.sizeService.fetchAll().subscribe(
      (data) => {
        this.sizes = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  loadColors(){
    this.colorService.fetchAll().subscribe(
      (data) => {
        this.colors = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  ngOnInit(): void {
    this.loadCategories();
    this.loadSizes();
    this.loadColors();
    
    
  }
  showModal(type: string,object:any){
    var button = document.createElement('button');
    button.setAttribute('data-toggle', "modal");
    button.setAttribute('data-target', `#${type}`);
    button.style.display = 'none';
    var main_category = document.querySelector('#main-category');
    main_category?.appendChild(button);
    if (type === 'updateSize'){
      this.name_size_update = object.nameSize;
      this.size_update = object;
    }
    if (type === 'updateColor'){
      this.name_color_update = object.nameColor;
      this.color_update = object;
    }
    button.click();
  }
  deleteSize(id:any){
    this.sizeService.deleteSize(id).subscribe(data =>{
      this.alertService.success("Xóa size thành công","")
      this.loadSizes();
    }, err =>{
      this.alertService.warn("Xóa size thất bại","")
    });
  }
  updateSize(){
    if (this.name_size_update.length==0){
      this.alertService.warn("Thêm size thất bại","Vui lòng nhập size");
    }
    else{
      this.sizeService.updateSize({
        idSize : this.size_update.idSize,
        nameSize:this.name_size_update.toUpperCase(),
      }).subscribe(data =>{
        document.getElementById("closeSize2")?.click();
        this.loadSizes()
        this.alertService.success("Update size thành công","Size đã được sửa vào");
      
      }, (err:HttpErrorResponse) =>{
        if (err.status === 400){
          this.alertService.warn("Thêm size thất bại","Size đã tồn tại");
        }
      })
    }
  }
  addSize(){

    if (this.name_size.length==0){
      this.alertService.warn("Thêm size thất bại","Vui lòng nhập size");
    }
    else{
      this.sizeService.addSize({
        idSize : null,
        nameSize:this.name_size.toUpperCase(),
      }).subscribe(data =>{
        document.getElementById("closeSize")?.click();
        this.loadSizes()
        this.alertService.success("Thêm size thành công","Size đã được thêm vào");
      
      }, (err:HttpErrorResponse) =>{
        if (err.status === 400){
          this.alertService.warn("Thêm size thất bại","Size đã tồn tại");
        }
      })
    }
  }
  deleteColor(id:any){
    this.colorService.delete(id).subscribe(data =>{
      this.alertService.success("Xóa color thành công","")
      this.loadColors();
    }, err =>{
      this.alertService.warn("Xóa color thất bại","")
    });
  }
  addColor(){

    if (this.name_color.length==0){
      this.alertService.warn("Thêm size thất bại","Vui lòng nhập size");
    }
    else{
      this.colorService.addColor({
        idColor : null,
        nameColor:this.name_color.toUpperCase(),
      }).subscribe(data =>{
        document.getElementById("closeColor")?.click();
        this.loadColors()
        this.alertService.success("Thêm color thành công","Color đã được thêm vào");
      }, (err:HttpErrorResponse) =>{
          this.alertService.warn("Thêm color thất bại","Color đã tồn tại");
        
      })
    }
  }
  updateColor(){
    if (this.name_color_update.length==0){
      this.alertService.warn("Thêm size thất bại","Vui lòng nhập size");
    }
    else{
      this.colorService.update({
        idColor: this.color_update.idColor, nameColor: this.name_color_update
      }).subscribe(data =>{
        document.getElementById("closeColor2")?.click();
        this.loadColors()
        this.alertService.success("Update color thành công","Color đã được sửa vào");
      }, (err:HttpErrorResponse) =>{
        if (err.status === 400){
          this.alertService.warn("Update color thất bại","Color đã tồn tại");
        }
      })
    }
  }
}
