import { IProductStyle } from "./product_styles.model";

export interface ICategory{
     idCategory:number ;
     nameCategory:string;
      productStyles:IProductStyle[];
}