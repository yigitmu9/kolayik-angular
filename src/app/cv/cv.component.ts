import {Component, Inject, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {Cv, User} from "../Cv";
import {CvService} from "../services/cv.service";
import {KeycloakService} from "keycloak-angular";


@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent implements OnInit {
  @Output() onAddCv: EventEmitter<Cv> = new EventEmitter();
  @Input() cv!: Cv;
  @Input() user!: User;
  Cvs: Cv[] = [];
  Users: User[] = [];
  userName: any;





  constructor(public dialog: MatDialog, private cvService: CvService,private keycloak: KeycloakService) { }

  ngOnInit(): void {
    this.userName = this.keycloak.getUsername();
    if (this.userName == 'manager') {
      this.cvService.getCvs().subscribe((Cvs) => (this.Cvs = Cvs))
    }
    if(this.userName == 'head hunter') {
      this.cvService.getUsers().subscribe((Cvs) => (this.Cvs = Cvs))
    }

    else {
      return;
    }



  }

  openDialog(): void {
   this.dialog.open(DialogOverviewExampleDialog);

  }



 // addCv() {
 //   this.cvService.addCv(this.cv).subscribe((cv) => (this.Cvs.push(cv)))
 // }



}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  @Input() cv!: Cv;
  @Input() user!: User;
  @Output() onAddCv: EventEmitter<Cv> = new EventEmitter();
  Cvs: Cv[] = [];
  Users: User[] = [];



  profileForm = this.fb.group({
    name: [''],
    alan: [''],


  })









  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialog>, private fb: FormBuilder,private cvService: CvService) {
  }


  ngOnInit() {
    this.dialogRef.updateSize('auto', 'auto');
    this.cvService.getCvs().subscribe((Cvs) => (this.Cvs = Cvs))
  }



  onSubmit() {
    console.log(this.profileForm.value.name)

    const newCv = {


      name: this.profileForm.value.name,
      alan: this.profileForm.value.alan,
      notes: this.profileForm.value.notes,

    };

    this.onAddCv.emit(newCv);

    this.profileForm.value.name = '';
    this.profileForm.value.alan = '';
    this.profileForm.value.notes = '';

    this.cvService.addCv(newCv).subscribe((cv) => (this.Cvs.push(cv)));


  }


}
