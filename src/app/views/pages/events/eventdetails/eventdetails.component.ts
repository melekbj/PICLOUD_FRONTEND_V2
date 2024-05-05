import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/eventModule/event.service';
import { ImageService } from 'src/app/services/eventModule/image.service';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';
import { Image } from 'src/app/model/image';
import { JwtService } from 'src/app/services/jwt.service';


@Component({
  selector: 'app-eventdetailscompoenent',
  templateUrl: './eventdetails.component.html',
  styleUrls: ['./eventdetails.component.scss']
})
export class EventdetailsComponent implements OnInit {

  events: any;
  image: Image;

  
  

  constructor(private eventService: EventService, private jwtService: JwtService) { }

  getEvents() {
    this.jwtService.getEvents().subscribe(events => {
      this.events = events;
      this.events.forEach(event => {
        this.jwtService.getImageUrl(event.id).subscribe(imageUrl => {
          event.imageUrl = imageUrl;
        });
      });
    });
  }
  


  ngOnInit() {
    this.jwtService.getEvents().pipe(
      mergeMap((events: any[]) => {
        this.events = events;
        return forkJoin(
          this.events.map(event =>
            this.jwtService.getImageUrl(event.id).pipe(
              tap((imageUrl: string) => {
                event.imageUrl = imageUrl;
              })
            )
          )
        );
      })
    ).subscribe();
  }

  deleteEvent(eventId: number){
    this.eventService.deleteEvent(eventId).subscribe(response => {
      console.log(response);
      this.getEvents();
    });
  }

}
