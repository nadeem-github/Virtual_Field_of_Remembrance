import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeListingComponent } from './pages/home-listing/home-listing.component';
import { AddFormComponent } from './pages/add-form/add-form.component';
import { EditFormComponent } from './pages/edit-form/edit-form.component';
import { DonateNowComponent } from './pages/donate-now/donate-now.component';
import { BuyWoodenCrossComponent } from './pages/buy-wooden-cross/buy-wooden-cross.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', },
  { path: 'home', component: HomeListingComponent },
  { path: 'addNew', component: AddFormComponent },
  { path: 'edit', component: EditFormComponent },
  { path: 'donateNow', component: DonateNowComponent },
  { path: 'buyWoodenCross', component: BuyWoodenCrossComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
