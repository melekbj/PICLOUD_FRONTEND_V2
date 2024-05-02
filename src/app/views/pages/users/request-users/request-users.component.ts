import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-ngx-datatable',
  templateUrl: './request-users.component.html',
  styleUrls: ['./request-users.component.scss']
})
export class RequestUsersComponent implements OnInit {

  rows = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;

  constructor(private jwtService: JwtService) {
    this.fetch('MEMBRE', (data: any) => {
      this.rows = data;
      this.loadingIndicator = false;
    });
  }

  ngOnInit(): void {
  }

  fetch(role: string, cb: any) {
    this.jwtService.getUsersByRole(role).subscribe(
      (response) => {
        cb(response);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

}
