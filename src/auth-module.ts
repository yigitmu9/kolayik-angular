import {APP_INITIALIZER, NgModule} from "@angular/core";
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {initializer} from "src/app-init";
import {AuthGuard} from "src/auth-guard";

@NgModule({
  declarations: [],
  imports: [KeycloakAngularModule],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initializer,
    multi: true,
    deps: [KeycloakService]
  },
    AuthGuard
  ]
})
export class AuthModule {}