import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VirtualFieldAPIsService } from 'src/app/virtual-field-apis.service';

@Component({
  selector: 'app-home-listing',
  templateUrl: './home-listing.component.html',
  styleUrls: ['./home-listing.component.scss']
})
export class HomeListingComponent {

  isLoading = true;
  remembrances: any[] = [];
  requestData = {};
  // baseURL = 'http://localhost:8002/storage/images/';
  baseURL = 'https://api.familiesofveterans.org.au/storage/images/';
  // https://api.familiesofveterans.org.au/api/admin/fetch-remebrance
  selectedRemembrance: any = null;

  constructor(
    private virtualFielsService: VirtualFieldAPIsService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.fetchRemembrances();
  }

  fetchRemembrances(): void {
    this.virtualFielsService.getRemembrances(this.requestData).subscribe(response => {
      if (response.success) {
        this.remembrances = response.data;
        // console.log(this.remembrances);
      }
    });
  }

  // Toggle Details on Image Click
  toggleDetails(remembrance: any): void {
    this.selectedRemembrance = this.selectedRemembrance === remembrance ? null : remembrance;
  }

  showDetails(remembrance: any): void {
    this.selectedRemembrance = remembrance;
  }

  hideDetails(): void {
    this.selectedRemembrance = null;
  }

  backgroundPositionX = 0;
  backgroundPositionY = 0;
  isDragging = false;
  startX = 0;
  startY = 0;

  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.startX = event.clientX - this.backgroundPositionX;
    this.startY = event.clientY - this.backgroundPositionY;
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;

    this.backgroundPositionX = event.clientX - this.startX;
    this.backgroundPositionY = event.clientY - this.startY;
  }

  onMouseUp() {
    this.isDragging = false;
  }

  onTouchStart(event: TouchEvent) {
    this.isDragging = true;
    this.startX = event.touches[0].clientX - this.backgroundPositionX;
    this.startY = event.touches[0].clientY - this.backgroundPositionY;
  }

  onTouchMove(event: TouchEvent) {
    if (!this.isDragging) return;
    this.backgroundPositionX = event.touches[0].clientX - this.startX;
    this.backgroundPositionY = event.touches[0].clientY - this.startY;
  }

  onTouchEnd() {
    this.isDragging = false;
  }

}
