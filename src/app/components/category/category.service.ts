import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryModel } from "./category-response";
import {JwtService} from "../../services/jwt.service";

 // Make sure to adjust the path as per your project structure

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient, private jwtService: JwtService) { }

  getAllCategories(): Observable<Array<CategoryModel>> {
    return this.http.get<Array<CategoryModel>>('http://localhost:8080/api/category', { headers: this.jwtService.createAuhtorizationHeader() });
  }
  getCategory(id: number): Observable<CategoryModel> {
    return this.http.get<CategoryModel>(`http://localhost:8080/api/category/${id}`);
  }
  createCategory(categoryModel: CategoryModel): Observable<CategoryModel> {
    return this.http.post<CategoryModel>('http://localhost:8080/api/category', categoryModel, { headers: this.jwtService.createAuhtorizationHeader() });
  }
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/category/${id}`, { headers: this.jwtService.createAuhtorizationHeader() });
  }
}
