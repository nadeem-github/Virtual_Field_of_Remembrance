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
    this.virtualFielsService.getRemembrances({}).subscribe(res => {
      if (res.success) this.remembrances = res.data;
    });
  }

  // Drag State
  isDragging = false;
  backgroundPositionX = 0;
  backgroundPositionY = 0;
  contentPositionX = 0;
  contentPositionY = 0;

  startX = 0;
  startY = 0;
  startContentX = 0;
  startContentY = 0;

  velocityX = 0;
  velocityY = 0;
  lastX = 0;
  lastY = 0;
  momentumFrame: any;

  onMouseDown(event: MouseEvent) {
    this.cancelMomentum();
    this.isDragging = true;
    this.startX = event.clientX - this.backgroundPositionX;
    this.startY = event.clientY - this.backgroundPositionY;
    this.startContentX = event.clientX - this.contentPositionX;
    this.startContentY = event.clientY - this.contentPositionY;
    this.lastX = event.clientX;
    this.lastY = event.clientY;
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;
    this.updatePositions(event.clientX, event.clientY);
  }

  onMouseUp() {
    this.isDragging = false;
    this.startMomentumScroll();
  }

  onTouchStart(event: TouchEvent) {
    this.cancelMomentum();
    const touch = event.touches[0];
    this.isDragging = true;
    this.startX = touch.clientX - this.backgroundPositionX;
    this.startY = touch.clientY - this.backgroundPositionY;
    this.startContentX = touch.clientX - this.contentPositionX;
    this.startContentY = touch.clientY - this.contentPositionY;
    this.lastX = touch.clientX;
    this.lastY = touch.clientY;
  }

  onTouchMove(event: TouchEvent) {
    if (!this.isDragging) return;
    const touch = event.touches[0];
    this.updatePositions(touch.clientX, touch.clientY);
  }

  onTouchEnd() {
    this.isDragging = false;
    this.startMomentumScroll();
  }

  updatePositions(currentX: number, currentY: number) {
    const deltaX = currentX - this.lastX;
    const deltaY = currentY - this.lastY;
    this.lastX = currentX;
    this.lastY = currentY;

    this.velocityX = deltaX;
    this.velocityY = deltaY;

    this.backgroundPositionX = currentX - this.startX;
    this.backgroundPositionY = currentY - this.startY;
    this.contentPositionX = currentX - this.startContentX;
    this.contentPositionY = currentY - this.startContentY;

    this.checkForMoreData();
  }

  startMomentumScroll() {
    const friction = 0.95;
    const step = () => {
      this.velocityX *= friction;
      this.velocityY *= friction;

      if (Math.abs(this.velocityX) < 0.5 && Math.abs(this.velocityY) < 0.5) return;

      this.contentPositionX += this.velocityX;
      this.contentPositionY += this.velocityY;
      this.backgroundPositionX += this.velocityX;
      this.backgroundPositionY += this.velocityY;

      this.checkForMoreData();
      this.momentumFrame = requestAnimationFrame(step);
    };

    this.momentumFrame = requestAnimationFrame(step);
  }

  cancelMomentum() {
    if (this.momentumFrame) cancelAnimationFrame(this.momentumFrame);
  }

  checkForMoreData() {
    const threshold = 200;
    if (this.contentPositionX > threshold) this.loadMoreData('left');
    else if (this.contentPositionX < -threshold) this.loadMoreData('right');
    if (this.contentPositionY > threshold) this.loadMoreData('up');
    else if (this.contentPositionY < -threshold) this.loadMoreData('down');
  }

  loadMoreData(direction: 'left' | 'right' | 'up' | 'down') {
    // Add pagination or filtering logic if needed
    // Example call:
    // this.virtualFielsService.getRemembrances({ direction }).subscribe(res => {
    //   if (res.success) this.remembrances.push(...res.data);
    // });
  }

}
