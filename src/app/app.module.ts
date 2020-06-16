import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { AngularFireModule }from '@angular/fire';
import { AngularFireDatabaseModule }from '@angular/fire/database';
import { environment }from '../environments/environment';
import { SliderModule } from 'angular-image-slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  
import { NgImageSliderModule } from 'ng-image-slider';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { ContentComponent } from './components/content/content.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MainComponent } from './components/main/main.component';
import { RegisterComponent } from './components/register/register.component';
import { IndivualComponent } from './components/register/indivual/indivual.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { ErrorComponent } from './components/error/error.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MainNavComponent } from './components/main/main-nav/main-nav.component';
import { HttpInterceptorBasicAuthService } from './services/http-interceptor-basic-auth.service';
import { MessagesComponent } from './components/admin/admin/messages/messages.component';
import { AdminNavComponent } from './components/admin/admin/admin-nav/admin-nav.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { UsersComponent } from './components/admin/admin/users/users.component';
import { FristPageComponent } from './components/frist-page/frist-page.component';
import { FooterComponent } from './components/footer/footer.component';
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
import { StoreUserComponent } from './components/store-user/store-user.component';
import { StoreNavComponent } from './components/store-user/store-nav/store-nav.component';
import { GetuserComponent } from './components/admin/admin/getuser/getuser.component';
import { AdminsComponent } from './components/admin/admin/admins/admins.component';
import { StoresComponent } from './components/admin/admin/stores/stores.component';
import { OrderNavComponent } from './components/admin/admin/orders/order-nav/order-nav.component';
import { WaitingComponent } from './components/admin/admin/orders/waiting/waiting.component';
import { StoreCarComponent } from './components/store-user/store-car/store-car.component';
import { MycarComponent } from './components/store-user/store-car/mycar/mycar.component';
import { AddCarComponent } from './components/store-user/store-car/add-car/add-car.component';
import { EditCarComponent } from './components/store-user/store-car/edit-car/edit-car.component';
import { StoreOrdersComponent } from './components/store-user/store-orders/store-orders.component';
import { CompanyComponent } from './components/admin/order-found/company/company.component';
import { FindOrderComponent } from './components/store-user/store-orders/find-order/find-order.component';
import { StoreProfileComponent } from './components/store-user/store-profile/store-profile.component';
import { FinishedOrderComponent } from './components/admin/admin/orders/finished-order/finished-order.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ContentComponent,
    LoginComponent,
    MainComponent,
    RegisterComponent,
    IndivualComponent,
    PricingComponent,
    ErrorComponent,
    LogoutComponent,
    MainNavComponent,
    MessagesComponent,
    AdminNavComponent,
    AdminComponent,
    UsersComponent,
    FristPageComponent,
    FooterComponent,
    PrivacyComponent,
    MyAccountComponent,
    ChagePasswordComponent,
    AboutUsComponent,
    StoreComponent,
    MyprofileComponent,
    UpdatedataComponent,
    WalletComponent,
    NotificationsComponent,
    OrdersComponent,
    MyOrderComponent,
    OrderFoundComponent,
    StoreUserComponent,
    StoreNavComponent,
    GetuserComponent,
    AdminsComponent,
    StoresComponent,
    OrderNavComponent,
    WaitingComponent,
    StoreCarComponent,
    MycarComponent,
    AddCarComponent,
    EditCarComponent,
    StoreOrdersComponent,
    CompanyComponent,
    FindOrderComponent,
    StoreProfileComponent,
    FinishedOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SliderModule,
    NgImageSliderModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment),
    AngularFireDatabaseModule,
    CarouselModule ,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyBKVyP3w_ayBOQUsEyzOMJI6k-AlQxG0Ic'
    })  
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS , useClass:HttpInterceptorBasicAuthService , multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
