import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  thisUserEmail :string
  thisUser: any

  constructor(
    @Inject(DOCUMENT) private document: Document, 
    private renderer: Renderer2,
    private router: Router,
    private service: JwtService
  ) { }

  ngOnInit(): void {
    this.thisUserEmail = this.service.getEmailFromToken();
    this.service.getUserByEmail(this.thisUserEmail).subscribe((data) => {
      this.thisUser = data;
      console.log(this.thisUser)
    });
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
