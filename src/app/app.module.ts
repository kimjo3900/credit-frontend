import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './carousel/carousel.component';
import { ButtonComponent } from './button/button.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactComponent } from './contact/contact.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { HelpComponent } from './help/help.component';
import { NavbarDashComponent } from './navbar-dash/navbar-dash.component';
import { NavbarSimpleComponent } from './navbar-simple/navbar-simple.component';
import { HttpClientModule } from '@angular/common/http';
import { TermsComponent } from './terms/terms.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StatementsComponent } from './statements/statements.component';

const MaterialComponents = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  MatToolbarModule,
  MatSliderModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatTabsModule,
  MatStepperModule,
  MatCheckboxModule,
  MatRadioModule,
  ReactiveFormsModule,
  MatSelectModule,
  FormsModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatAutocompleteModule,
  MatProgressBarModule,
  MatTableModule,
  MatSnackBarModule,
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarouselComponent,
    ButtonComponent,
    SigninComponent,
    HomeComponent,
    RegisterComponent,
    FooterComponent,
    DashboardComponent,
    ContactComponent,
    HelpComponent,
    NavbarDashComponent,
    NavbarSimpleComponent,
    TermsComponent,
    StatementsComponent,
  ],
  imports: [MaterialComponents, NgbModule, HttpClientModule],
  exports: [MaterialComponents],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
