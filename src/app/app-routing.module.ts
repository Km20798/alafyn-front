import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContentComponent } from './components/content/content.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { RegisterComponent } from './components/register/register.component';
import { IndivualComponent } from './components/register/indivual/indivual.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { ErrorComponent } from './components/error/error.component';
import { RouteGuardService } from './services/route-guard.service';
import { MessagesComponent } from './components/admin/admin/messages/messages.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { UsersComponent } from './components/admin/admin/users/users.component';
import { FristPageComponent } from './components/frist-page/frist-page.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { MyAccountComponent } from './components/main/my-account/my-account.component';
import { ChagePasswordComponent } from './components/chage-password/chage-password.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { StoreComponent } from './components/register/store/store.component';
import { MyprofileComponent } from './components/main/myprofile/myprofile.component';
import { UpdatedataComponent } from './components/main/updatedata/updatedata.component';
import { WalletComponent } from './components/main/wallet/wallet.component';
import { NotificationsComponent } from './components/main/notifications/notifications.component';
import { OrdersComponent } from './components/admin/admin/orders/orders.component';
import { MyOrderComponent } from './components/main/my-order/my-order.component';
import { OrderFoundComponent } from './components/admin/order-found/order-found.component';
import { storeComponent } from './components/store/store.component'


const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"home", component:FristPageComponent},  
  {path:"contect-us" , component:ContentComponent},
  {path:"pricing" , component:PricingComponent},
  {path:"login" , component:LoginComponent},
  {path:"about-us" , component:AboutUsComponent},
  {path:"register/store" , component:StoreComponent},
  {path:"myProfile" , component:MyprofileComponent , canActivate:[RouteGuardService]},
  {path:"password" , component:ChagePasswordComponent},
  {path:"welcome" , component:MainComponent , canActivate:[RouteGuardService]},
  {path:"register" , component:RegisterComponent},
  {path:"register/individual" , component:IndivualComponent},
  {path:"logout" , redirectTo:"login"},
  {path:"notifications" , component:NotificationsComponent , canActivate:[RouteGuardService]},
  {path:"myWallet" , component:WalletComponent , canActivate:[RouteGuardService]},
  {path:"updatedata" , component:UpdatedataComponent , canActivate:[RouteGuardService]},
  {path:"welcome/admin" , component:AdminComponent , canActivate:[RouteGuardService]},
  {path:"users" , component:UsersComponent , canActivate:[RouteGuardService] },
  {path:"search/:code" , component:OrderFoundComponent , canActivate:[RouteGuardService]},
  {path:"messages" , component:MessagesComponent , canActivate:[RouteGuardService]},
  {path:"orders" , component:OrdersComponent , canActivate:[RouteGuardService]},
  {path:"terms-conditions" , component:PrivacyComponent },
  {path:"myOrders" , component:MyOrderComponent , canActivate:[RouteGuardService]}, 
  {path:"account" , component:MyAccountComponent , canActivate:[RouteGuardService]}, 
  {path:"store/welcome" , component:storeComponent , canActivate:[RouteGuardService]}, 
  {path:"**" , component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
