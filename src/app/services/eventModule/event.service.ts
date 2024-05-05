import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const EVENTURL = "http://localhost:8080/event/";
const IMAGEURL = "http://localhost:8080/cloudinary/";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  getEvents(){
    return this.http.get(EVENTURL + 'getAllEvents');
  }
  addEvent(event: any){
    return this.http.post(EVENTURL + 'addEvent', event);
  }
  deleteEvent(eventId: number){
    return this.http.delete(EVENTURL + 'deleteEvent/' + eventId);
  }
  public upload(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('multipartFile', image);
    return this.http.post<any>(IMAGEURL + 'upload', formData);
  }
  getImageUrl(id: number) {
    return this.http.get(IMAGEURL + 'Imageurl/' + id);
  }
}

