import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {Router} from "@angular/router";
import {Cv} from "../Cv";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @Output() sendUserName = new EventEmitter<string>();
  role: any;
  userName: any;
  keycloakService: any;


  constructor(private keycloak: KeycloakService, private router: Router) { }

  ngOnInit(): void {
    this.role = this.keycloak.getUserRoles();
    this.userName = this.keycloak.getUsername();
    this.sendUserName.emit(this.userName);

  }



  managerLogin(){
    this.router.navigate(['/manager']);
  }
  employeeLogin(){
    this.router.navigate(['/employee'])
  }

  logout(){
    this.keycloak.logout();
  }
}
