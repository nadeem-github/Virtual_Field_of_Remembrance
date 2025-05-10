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
  selectedRemembrance: any = null;

  constructor(
    private virtualFielsService: VirtualFieldAPIsService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.fetchRemembrances();
    this.setInitialPositions();
    window.addEventListener('resize', this.setInitialPositions.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.setInitialPositions.bind(this));
    this.cancelMomentum();
  }

  getBgDimensions() {
    if (window.innerWidth < 768) {
      return { bgWidth: 1500, bgHeight: 2000 }; // Mobile view
    }
    return { bgWidth: 3000, bgHeight: 3000 }; // Desktop view
  }

  getBuffer() {
    return window.innerWidth < 768 ? 50 : 80; // Mobile: 50px, Desktop: 100px
  }

  setInitialPositions() {
    const { width: bgWidth, height: bgHeight } = this.getBgSize();
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    this.backgroundPositionX = -(bgWidth - screenWidth) / 2;
    this.backgroundPositionY = -(bgHeight - screenHeight) / 2;

    this.contentPositionX = 0;
    this.contentPositionY = 0;
  }

  fetchRemembrances(): void {
    this.virtualFielsService.getRemembrances({}).subscribe(res => {
      if (res.success) this.remembrances = res.data;
      this.isLoading = false; // ✅ Fixed
    });
  }

  getBgSize() {
    const isMobile = window.innerWidth < 768;
    return isMobile ? { width: 1000, height: 1000 } : { width: 3000, height: 3000 };
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

  dragThreshold = 5; // ✅ Minimal movement to trigger drag
  dragStarted = false;

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

    let newBackgroundX = currentX - this.startX;
    let newBackgroundY = currentY - this.startY;
    let newContentX = currentX - this.startContentX;
    let newContentY = currentY - this.startContentY;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const { bgWidth, bgHeight } = this.getBgDimensions();

    const buffer = this.getBuffer();

    // X axis limit
    const maxLeft = buffer;
    const maxRight = -(bgWidth - screenWidth) - buffer;

    if (newBackgroundX > maxLeft) {
      newBackgroundX = maxLeft;
      newContentX = this.contentPositionX;
    }
    if (newBackgroundX < maxRight) {
      newBackgroundX = maxRight;
      newContentX = this.contentPositionX;
    }

    // Y axis limit
    const maxTop = buffer;
    const maxBottom = -(bgHeight - screenHeight) - buffer;

    if (newBackgroundY > maxTop) {
      newBackgroundY = maxTop;
      newContentY = this.contentPositionY;
    }
    if (newBackgroundY < maxBottom) {
      newBackgroundY = maxBottom;
      newContentY = this.contentPositionY;
    }

    this.backgroundPositionX = newBackgroundX;
    this.backgroundPositionY = newBackgroundY;

    this.contentPositionX = newContentX;
    this.contentPositionY = newContentY;

    this.checkForMoreData();
  }

  startMomentumScroll() {
    const friction = 0.95;
    const { bgWidth, bgHeight } = this.getBgDimensions();
    const maxDragX = bgWidth - window.innerWidth;
    const maxDragY = bgHeight - window.innerHeight;
    const buffer = this.getBuffer();

    const step = () => {
      this.velocityX *= friction;
      this.velocityY *= friction;

      if (Math.abs(this.velocityX) < 0.5 && Math.abs(this.velocityY) < 0.5) return;

      let newContentX = this.contentPositionX + this.velocityX;
      let newContentY = this.contentPositionY + this.velocityY;
      let newBackgroundX = this.backgroundPositionX + this.velocityX;
      let newBackgroundY = this.backgroundPositionY + this.velocityY;

      // X axis limit
      if (newBackgroundX > buffer) {
        newBackgroundX = buffer;
        newContentX = this.contentPositionX;
        this.velocityX = 0;
      }
      if (newBackgroundX < -maxDragX - buffer) {
        newBackgroundX = -maxDragX - buffer;
        newContentX = this.contentPositionX;
        this.velocityX = 0;
      }

      // Y axis limit
      if (newBackgroundY > buffer) {
        newBackgroundY = buffer;
        newContentY = this.contentPositionY;
        this.velocityY = 0;
      }
      if (newBackgroundY < -maxDragY - buffer) {
        newBackgroundY = -maxDragY - buffer;
        newContentY = this.contentPositionY;
        this.velocityY = 0;
      }

      this.backgroundPositionX = newBackgroundX;
      this.backgroundPositionY = newBackgroundY;

      this.contentPositionX = newContentX;
      this.contentPositionY = newContentY;

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
    // API call ya data load logic yahan implement karo bhai
  }
}
