import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeListingComponent } from './pages/home-listing/home-listing.component';
import { AddFormComponent } from './pages/add-form/add-form.component';
import { EditFormComponent } from './pages/edit-form/edit-form.component';
import { DonateNowComponent } from './pages/donate-now/donate-now.component';
import { BuyWoodenCrossComponent } from './pages/buy-wooden-cross/buy-wooden-cross.component';
import { DraggableComponent } from './pages/draggable/draggable.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full', },
  { path: '', component: HomeListingComponent },
  { path: 'addNew', component: AddFormComponent },
  { path: 'edit', component: EditFormComponent },
  { path: 'donateNow', component: DonateNowComponent },
  { path: 'buyWoodenCross', component: BuyWoodenCrossComponent },
  { path: 'draggable', component: DraggableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
