import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './carousel/carousel.component';
import {AutoComponent} from "./auto/auto.component";
import {AutoItemComponent} from "./auto/auto-item/auto-item.component";
import {AutoDetailsComponent} from "./auto/auto-details/auto-details.component";
import {AggiungiAutoComponent} from "./auto/aggiungi-auto/aggiungi-auto.component";
import { RecordRowBoxComponent } from './record-row-box/record-row-box.component';
import { FooterComponent } from './footer/footer.component';
import { ChiSiamoComponent } from './chi-siamo/chi-siamo.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpInterceptorService } from './_services/http-interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { NgMaterialModule } from './ng-material/ng-material.module';
import { FormFieldLabelExampleComponent } from './form-field-label-example/form-field-label-example.component';
import { ModalComponent } from './modal';
import { PrenotaInterventoComponent } from './prenota-intervento/prenota-intervento.component';
import {CalendarModule} from './calendar/calendar.module';
import {DayPilotModule} from "@daypilot/daypilot-lite-angular";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    CarouselComponent,
    AutoComponent,
    AutoItemComponent,
    AutoDetailsComponent,
    AggiungiAutoComponent,
    RecordRowBoxComponent,
    FooterComponent,
    ChiSiamoComponent,
    ChangePasswordComponent,
    FormFieldLabelExampleComponent,
    ModalComponent,
    PrenotaInterventoComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    NgMaterialModule,
    DayPilotModule,
    CalendarModule
  ],
  providers: [authInterceptorProviders, {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
