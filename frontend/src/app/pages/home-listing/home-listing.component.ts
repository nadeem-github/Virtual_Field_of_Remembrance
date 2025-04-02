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
      }
    });
  }

  // Toggle Details on Image Click
  toggleDetails(remembrance: any): void {
    this.selectedRemembrance = this.selectedRemembrance === remembrance ? null : remembrance;
  }

  ngAfterViewInit(): void {
    this.makeBackgroundDraggable();
  }

  makeBackgroundDraggable() {
    const section = document.getElementById('draggable-section');
    let isDragging = false;
    let startX = 0, startY = 0, scrollLeft = 0, scrollTop = 0;

    if (section) {
      section.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - section.offsetLeft;
        startY = e.pageY - section.offsetTop;
        scrollLeft = section.scrollLeft;
        scrollTop = section.scrollTop;
        section.style.cursor = 'grabbing';
      });

      section.addEventListener('mouseleave', () => {
        isDragging = false;
        section.style.cursor = 'grab';
      });

      section.addEventListener('mouseup', () => {
        isDragging = false;
        section.style.cursor = 'grab';
      });

      section.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - section.offsetLeft;
        const y = e.pageY - section.offsetTop;
        const walkX = x - startX;
        const walkY = y - startY;
        section.scrollLeft = scrollLeft - walkX;
        section.scrollTop = scrollTop - walkY;
      });
    }
  }
}
