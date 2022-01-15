import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { HelpComponent } from './help/help.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { TermsComponent } from './terms/terms.component';
import { StatementsComponent } from './statements/statements.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'help', component: HelpComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'dashboard/:username', component: DashboardComponent,canActivate: [AuthGuard]},
  { path: 'terms', component: TermsComponent },
  { path: 'dashboard/:username/statements', component: StatementsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
  providers: [AuthService]
})
export class AppRoutingModule {}
