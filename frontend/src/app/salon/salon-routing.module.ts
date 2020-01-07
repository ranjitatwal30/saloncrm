import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { AuthGuard } from '../salon/auth.guard';
import { AuthService } from '../salon/auth.service';




const routes: Routes = [
{path:'',component:LoginComponent},
{path:'home',component:DashboardComponent, canActivate: [AuthGuard],
children:[
 
  {path:'profile',component:ProfileComponent},
  {path:'',redirectTo:'profile',pathMatch:'full'},
  // {path:'time',component:TimeComponent},
  // {path:'booking',component:BookingsComponent},
  // {path:'payment',component:PaymentComponent},
  // {path:'account',component:AccountComponent},
  // {path:'cancelled',component:CancelledBookingsComponent},
  // {path:'ratings',component:RatingsComponent},
  // {path:'notification',component:NotificationsComponent},
  // {path:'gateway',component:GatewayComponent},
  // {path:'services',component:ServicesComponent},



]},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[AuthGuard,AuthService]
})
export class SalonRoutingModule { }