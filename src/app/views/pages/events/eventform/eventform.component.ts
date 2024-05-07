import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from 'src/app/services/jwt.service';
import { ImageService } from 'src/app/services/eventModule/image.service'; 
import { Image } from 'src/app/model/image';
import Swal from 'sweetalert2';
import { EventService } from 'src/app/services/eventModule/event.service';
import { end } from '@popperjs/core';

@Component({
  selector: 'app-eventform',
  templateUrl: './eventform.component.html',
  styleUrls: ['./eventform.component.scss']
})
export class EventformComponent implements OnInit {
  image: File | null = null;
  eventForm: FormGroup;
  events: any;
  eventTypes: string[] = ['Hackathon', 'Formation', 'Dons', 'Crowfunding', 'Other'];

  constructor(private formBuilder: FormBuilder, private jwtService: JwtService, private imageService: ImageService, private eventService: EventService) {
    this.eventForm = this.formBuilder.group({
      eventTitle: ['', Validators.required],
      eventDescription: ['', Validators.required],
      eventImage: [null],
      maxParticipants: ['', Validators.required],
      eventType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      location: ['', Validators.required],
      isPublic: ['', Validators.required],
      creator: [null],
    });
  }
  thisUserEmail;
  thisUser;
  ngOnInit(): void {
    this.thisUserEmail = this.eventService.getEmailFromToken();
    this.eventService.getUserByEmail(this.thisUserEmail).subscribe((data) => {
      this.thisUser = data;
      console.log(data);
    });
    
  }

  onSubmit() {
    const imageControl = this.eventForm.get('eventImage');
    if (imageControl && imageControl.value) {
      const image = imageControl.value;
      this.imageService.upload(image).subscribe(response => {
        try {
          const responseObj = JSON.parse(response);
          const uploadedImage = new Image();
          uploadedImage.name = responseObj.name;
          uploadedImage.imageUrl = responseObj.url;
          uploadedImage.imageId = responseObj.public_id;
          imageControl.setValue(uploadedImage);
          this.createEvent();
        } catch (error) {
          Swal.fire('Error', 'Invalid server response', 'error');
        }
      }, error => {
        Swal.fire('Error', 'Could not upload the image', 'error');
      });
    } else {
      this.createEvent();
    }
  }

  createEvent() {
    this.eventForm.value.creator = this.thisUser;
    
    console.log(this.eventForm.value);
    
    this.eventService.addEvent(this.eventForm.value).subscribe(response => {
      Swal.fire('Success', 'Event and image uploaded successfully', 'success');
      this.getEvents();
    }, error => {
      Swal.fire('Error', 'Could not create the event', 'error');
    });
  }
  

  getEvents() {
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
    });
  }

  onFileChange(event: any): void {
    this.image = event.target.files[0];
    this.eventForm.get('eventImage')?.setValue(this.image);
  }
}
