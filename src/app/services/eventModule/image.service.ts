import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from 'src/app/model/image';

const IMAGEURL = "http://localhost:8080/cloudinary/";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  

  public list(): Observable<any> {
    return this.http.get<any>(IMAGEURL + 'list');
  }


  public upload(image: File): Observable<string> {
    const formData = new FormData();
    formData.append('multipartFile', image);
    return this.http.post<string>(IMAGEURL + 'upload', formData, {responseType: 'text' as 'json'});
  }

  public delete(id: any): Observable<any> {
    return this.http.delete<any>(IMAGEURL + `delete/${id}`);
  }
}