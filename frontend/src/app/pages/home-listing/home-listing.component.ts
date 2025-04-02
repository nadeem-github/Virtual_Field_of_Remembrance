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
  baseURL = 'http://localhost:8002/storage/images/'; // Base URL
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
        console.log(this.remembrances);
      }
    });
  }

  // Toggle Details on Image Click
  toggleDetails(remembrance: any): void {
    this.selectedRemembrance = this.selectedRemembrance === remembrance ? null : remembrance;
  }
}
