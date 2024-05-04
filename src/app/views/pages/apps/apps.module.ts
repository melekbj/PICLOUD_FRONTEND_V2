import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

import { NgbDropdownModule, NgbTooltipModule, NgbNavModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SimplemdeModule, SIMPLEMDE_CONFIG } from 'ng2-simplemde'

import { AppsComponent } from './apps.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ChatComponent } from './chat/chat.component';
import { EmailComponent } from './email/email.component';
import { InboxComponent } from './email/inbox/inbox.component';
import { ReadComponent } from './email/read/read.component';
import { ComposeComponent } from './email/compose/compose.component';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ClubCreateComponent } from 'src/app/components/clubs/club-create/club-create.component';
import { ClublistadminsiteComponent } from 'src/app/components/clubs/clublistadminsite/clublistadminsite.component';
import { ArchwizardModule } from 'angular-archwizard';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MembersListComponent} from 'src/app/components/members/members-list/members-list.component';
import { MemberCreateComponent } from 'src/app/components/members/member-create/member-create.component';
import { BehaviorScoreListComponent} from 'src/app/components/BehaviorScore/behaviorscore-list/behaviorscore-list.component';
import { BehaviorscoreCreateComponent } from 'src/app/components/BehaviorScore/behaviorscore-create/behaviorscore-create.component';
import { DepartmentListComponent } from 'src/app/components/department/department-list/department-list.component';
import { DepartmentCreateComponent } from 'src/app/components/department/department-create/department-create.component';
import { DepartmentDetailsComponent } from 'src/app/components/department/department-details/department-details.component';
import { DepartmentUpdateComponent } from 'src/app/components/department/department-update/department-update.component';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {

  suppressScrollX: true
};

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
])

const routes: Routes = [
  {
    path: '',
    component: AppsComponent,
    children: [
      { path: 'departments', component: DepartmentListComponent},
      { path: 'department/create/:id', component: DepartmentCreateComponent },
      { path: 'department/update/:iddepartment/:idclub', component: DepartmentUpdateComponent },
      { path: 'department/get/:id', component: DepartmentDetailsComponent },
      { path: 'behavior-score/list/:userId/:clubId', component: BehaviorScoreListComponent },
      { path: 'behavior-score/create/:userId/:clubId', component: BehaviorscoreCreateComponent },
      { path: 'members', component: MembersListComponent},
      { path: 'member/create', component: MemberCreateComponent},
      {path:'clubadminsite',component:ClublistadminsiteComponent},
      { path: 'club/create', component: ClubCreateComponent },
      {
        path: '',
        redirectTo: 'calendar',
        pathMatch: 'full',
      },
      {
        path: 'email',
        component: EmailComponent,
        children: [
          {
            path: '',
            redirectTo: 'inbox',
            pathMatch: 'full'
          },
          {
            path: 'inbox',
            component: InboxComponent
          },
          {
            path: 'read',
            component: ReadComponent
          },
          {
            path: 'compose',
            component: ComposeComponent
          }
        ]
      },
      {
        path: 'chat',
        component: ChatComponent
      },
      {
        path: 'calendar',
        component: CalendarComponent
      },
    ]
  }
]

@NgModule({
  declarations: [EmailComponent, ChatComponent, CalendarComponent, AppsComponent, 
    ClubCreateComponent,
    ClublistadminsiteComponent,
    MemberCreateComponent,
    MembersListComponent,
    BehaviorScoreListComponent,
    BehaviorscoreCreateComponent,
    DepartmentListComponent,
    DepartmentCreateComponent,
    DepartmentDetailsComponent,
    DepartmentUpdateComponent,

    InboxComponent, ReadComponent, ComposeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    FullCalendarModule, // import the FullCalendar module! will make the FullCalendar component available
    PerfectScrollbarModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbNavModule,
    NgbCollapseModule,
    NgSelectModule,
    ReactiveFormsModule,
    ArchwizardModule,
    AngularCropperjsModule,
    CarouselModule,
    SweetAlert2Module.forRoot(),
    NgxDatatableModule,
    SimplemdeModule.forRoot({
      provide: SIMPLEMDE_CONFIG,
      useValue: {}
    })
  ],
  exports: [
    ClubCreateComponent,
    ClublistadminsiteComponent,
    // other components...
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class AppsModule { }
