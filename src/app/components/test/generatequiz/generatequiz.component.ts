import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, forkJoin, throwError } from 'rxjs';
import { Club } from 'src/app/models/club.model';
import { ClubService } from 'src/app/services/club.service';
import { JwtService } from 'src/app/services/jwt.service';
import { QuizService } from 'src/app/services/quiz.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-generatequiz',
  templateUrl: './generatequiz.component.html',
  styleUrls: ['./generatequiz.component.scss']
})
export class GeneratequizComponent implements OnInit {
  spinner=false;
  apiform!: FormGroup;
  selectedValue: number = 0;
  quizsbyapi: any[] = [];
  clubId:any;
  idUser: any;
  updateValue(value: any) {
    this.selectedValue = value.target.value;
  }
  lequestionbidou:any;
  constructor(private fb: FormBuilder,
    private jwtService:JwtService,
    private quizservice: QuizService,
    private userService: UserService,
    private clubService:ClubService) { }

  ngOnInit(): void {
    
console.log("ttttttttttttttttttttteeesssst");
      

     // console.log(this.jwtService.getemail());
    this.apiform = this.fb.group({
      langue: ['fr'],
      choix: ['2'],
      categorie: ['0'],
      difficulte: ['0'],
      nbrquestions: ['10',Validators.required],
      anecdote: ['1'],
      wikipedia: ['1']
    });
    /*let email = this.jwtService.getemail();
    this.userService.getUserbyemail(email).subscribe(
      (res) => {
        console.log(res.id);
        this.clubService.getClubByUserAndPresident(res.id).pipe(
          catchError(error => {
            console.error("Error occurred: ", error);
            return throwError(error);
          })
        ).subscribe(
          (response) => {
            this.club = response;
            console.log("Club: ", this.club);
          }
        );
    
        // localStorage.setItem('idUser', res.id.toString()); 
        this.idUser = res.id;
        console.log("After I get the user: " + this.idUser);
      },
      error => {
        console.error("Error occurred: ", error);
      }
    );*/
    this.clubId = Number(localStorage.getItem('idClub'));
    this.idUser = Number(localStorage.getItem('idUser'));
            
  }
  test() {
    this.spinner=true;
    console.log(this.apiform.value);
    this.url = this.openquizzdbAPI  + "&lang=" + this.apiform.value.langue
                                    + "&choice=" + this.apiform.value.choix
                                    + "&categ=" + this.apiform.value.categorie
                                    + "&diff=" + this.apiform.value.difficulte
                                    + "&anec=" + this.apiform.value.anecdote
                                    + "&wiki=" + this.apiform.value.wikipedia;
    
    //console.log(this.url);
  //   for (let i = 1; i <= this.apiform.value.nbrquestions; i++) {
  //     sleep(10)
  //     this.quizservice.getaquestion(this.url).subscribe((response: any) => { 
  //         this.lequestionbidou = response.results; 
  //         this.quizsbyapi = this.quizsbyapi.concat(this.lequestionbidou); // Use concat to merge arrays properly
  //     });
  // }
  const requests = [];
  for (let i = 1; i <= this.apiform.value.nbrquestions; i++) {
    requests.push(this.quizservice.getaquestion(this.url));
  }
  
   
    
    // this.quizservice.addQuizApi(this.quizsbyapi).subscribe(()=>{location.reload();});
    forkJoin(requests).subscribe((responses: any[]) => {
      console.log("responses"+ responses);
      this.quizsbyapi = responses;
      console.log("quizsbyapi", this.quizsbyapi);
      //this.quizsbyapi = responses.flatMap((response: any) => response.results);
      //console.log(this.quizsbyapi);
      this.quizsbyapi = responses.flatMap((response: any) => {
        console.log("response.results", response.results);
        return response.results;
      });
      //this.quizsbyapi.push({club:{id:this.club.id}});
      console.log("test:::::::::::::::::::::::" + this.quizsbyapi);
      this.quizservice.addQuizApi(this.quizsbyapi).subscribe((response) => {
        this.clubService.updateClubTest(this.clubId, response).subscribe(
          () => {
            location.reload();
          } 
        );
        /*console.log(response);
        this.club.tests.push(response);
        console.log(this.club.tests);
        console.log(this.club)
        this.clubService.updateClub(this.club.id,this.club).subscribe();*/
        //location.reload();
        

      });
    });
  }
  private openquizzdbAPI = 'https://api.openquizzdb.org/?key=7YRZNR624Q';
  private url: any


  /*
  langue           &lang=
  nbr de choix     &choice=
  categorie        &categ=sports
  difficulté       &diff=1
  anecdote         &anec=1
  Wikipédia        &wiki=1
  */
}