import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeListingComponent } from './pages/home-listing/home-listing.component';
import { AddFormComponent } from './pages/add-form/add-form.component';
import { EditFormComponent } from './pages/edit-form/edit-form.component';
import { DonateNowComponent } from './pages/donate-now/donate-now.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BuyWoodenCrossComponent } from './pages/buy-wooden-cross/buy-wooden-cross.component';
import { DraggableComponent } from './pages/draggable/draggable.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeListingComponent,
    AddFormComponent,
    EditFormComponent,
    DonateNowComponent,
    BuyWoodenCrossComponent,
    DraggableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
