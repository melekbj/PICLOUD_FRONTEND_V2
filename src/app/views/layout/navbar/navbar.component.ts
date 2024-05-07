import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { JwtService } from 'src/app/services/jwt.service';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  thisUserEmail :string
  thisUser: any


  searchControl = new FormControl();
 

  constructor(
    @Inject(DOCUMENT) private document: Document, 
    private service: JwtService
  ) { }

  ngOnInit(): void {

    const email = this.service.getEmailFromToken();
    if (email) {
      this.service.getUserByEmail(email).subscribe(data => {
        this.thisUser = data;
        console.log('User details retrieved:', this.thisUser); // Log user details here
      }, error => {
        console.error('Failed to fetch user details:', error);
      });
    }
  }




  }

  

  /**
   * Sidebar toggle on hamburger button click
   */

  toggleSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }

  logout() {
    this.service.logout();
  }

}
