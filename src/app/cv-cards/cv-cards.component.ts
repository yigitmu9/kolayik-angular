import {Component, OnInit, Input, Output, EventEmitter, ViewChild, Inject} from '@angular/core';
import {Cv, User} from "../Cv";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {CvService} from "../services/cv.service";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-cv-cards',
  templateUrl: './cv-cards.component.html',
  styleUrls: ['./cv-cards.component.scss']
})
export class CvCardsComponent implements OnInit {
  @Input() cv!: Cv;
  @Input() user!: User;
  @Output() onOnClick = new EventEmitter();
  Cvs: Cv[] = [];
  Users: User[] = [];







  constructor(public dialog: MatDialog, private cvService: CvService) { }

  ngOnInit(): void {
    this.cvService.getCvs().subscribe((Cvs) => (this.Cvs = Cvs))


  }



  onClick() {
    this.dialog.open(CvDialog,{ data: { cv: this.cv, }});

  }

  onClickSend() {
    console.log(this.cv)

    this.dialog.open(SendCvDialog,{ data: { cv: this.cv, }});

  }



}
/*
export interface PeriodicElement {
  person: string;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {person: '1. Kişi',  symbol: '8'},
  {person: '2. Kişi',  symbol: '7'},
  {person: '3. Kişi',  symbol: '6'},
  {person: '4. Kişi',  symbol: '5'},
  {person: '5. Kişi',  symbol: '4'},
  {person: '6. Kişi',  symbol: '3'},
  {person: '7. Kişi',  symbol: '2'},
  {person: '8. Kişi',  symbol: '1'},
  {person: '9. Kişi',  symbol: '0'},
  {person: '10. Kişi',  symbol: '9'},
];
*/
@Component({
  selector: 'cv-dialog',
  templateUrl: 'cv-dialog.html',
})
export class CvDialog {
  @Input() cv!: Cv;
  @Input() user!: User;
  displayedColumns: string[] = ['name', 'symbol'];
  //dataSource = ELEMENT_DATA;
  Cvs: Cv[] = [];
  Users: User[] = [];


  constructor(public dialogRef: MatDialogRef<CvDialog>,@Inject(MAT_DIALOG_DATA) public _data: any, private cvService: CvService) {}

  ngOnInit(): void {
    this.dialogRef.updateSize('1300px' , '620px');
    this.cvService.getCvs().subscribe((Cvs) => (this.Cvs = Cvs))
    console.log(this._data.cv.name)
  }




}


@Component({
  selector: 'send-cv-dialog',
  templateUrl: 'send-cv-dialog.html',
})
export class SendCvDialog {

  @Input() cv!: Cv;
  @Input() user!: User;
  @Output() onSendCv: EventEmitter<Cv> = new EventEmitter();

  displayedColumns: string[] = ['name', 'symbol'];
  //dataSource = ELEMENT_DATA;
  Cvs: Cv[] = [];
  Users: User[] = [];
  userName: any;


  profileForm = this.fb.group({
    user: [''],
    decision: [''],
    notes: [''],

  })

  constructor(public dialogRef: MatDialogRef<CvDialog>,private fb: FormBuilder,private cvService: CvService,private keycloak: KeycloakService,  @Inject(MAT_DIALOG_DATA) private _data: any,) {}

  ngOnInit(): void {
    this.dialogRef.updateSize('1300px' , '620px');
    this.userName = this.keycloak.getUsername();
    console.log(this.cv)

  }

  onClick(cv:Cv) {



    const newCv = {


      name: this._data.cv.name,
      alan: this._data.cv.alan,
      notes: this.profileForm.value.notes,
      decision: this.profileForm.value.decision,
      commissioner: this.userName,

    };

    this.onSendCv.emit(newCv);

    this._data.name = '';
    this._data.alan = '';
    this.profileForm.value.notes = '';
    this.profileForm.value.decision = '';
    this.userName = '';


    this.userName = this.keycloak.getUsername();

    if (this.userName == 'manager') {
      this.cvService.addCv(newCv).subscribe((cv) => (this.Cvs.push(cv)));
      this.cvService.eraseCv(this._data.cv).subscribe((cv) => (this.Cvs = this.Cvs.filter((t) => t.id !== this._data.cv.id)));
    }
    if(this.userName == 'head hunter') {
      this.cvService.sendCv(newCv).subscribe((cv) => (this.Cvs.push(cv)));
      this.cvService.deleteCv(this._data.cv).subscribe((cv) => (this.Cvs = this.Cvs.filter((t) => t.id !== this._data.cv.id)));
    }

    else {
      return;
    }



  }





}
