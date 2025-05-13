import { Component } from '@angular/core';
import { VirtualFieldAPIsService } from 'src/app/virtual-field-apis.service';

@Component({
  selector: 'app-home-listing',
  templateUrl: './home-listing.component.html',
  styleUrls: ['./home-listing.component.scss']
})
export class HomeListingComponent {

  isDragging = false;
  lastX = 0;
  lastY = 0;
  offsetX = 0;
  offsetY = 0;
  velocityX = 0;
  velocityY = 0;
  zoomLevel = 1;

  bgWidth = 4000;
  bgHeight = 3000;

  remembrances: any[] = [];
  remembranceRows: any[][] = [];
  selectedRemembrance: any = null;
  // baseURL = 'http://localhost:8002/storage/images/';
  baseURL = 'https://api.familiesofveterans.org.au/storage/images/';

  constructor(private virtualFielsService: VirtualFieldAPIsService) { }

  ngOnInit(): void {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 500) {
      this.bgWidth = 1000;  // e.g., 5 items * 100px width + spacing
      this.bgHeight = 3000;
    } else {
      this.bgWidth = 4000;
      this.bgHeight = 3000;
    }

    this.fetchRemembrances();

    const viewW = window.innerWidth;
    const viewH = window.innerHeight;
    this.offsetX = (viewW - this.bgWidth) / 2;
    this.offsetY = (viewH - this.bgHeight) / 2;

    requestAnimationFrame(this.animateDrag.bind(this));
  }


  fetchRemembrances(): void {
    this.virtualFielsService.getRemembrances({}).subscribe((res) => {
      if (res.success) {
        this.remembrances = res.data;
        this.chunkRemembrances();
      }
    });
  }

  chunkRemembrances(): void {
    const screenWidth = window.innerWidth;
    const size = screenWidth <= 500 ? 5 : 12;

    this.remembranceRows = [];
    for (let i = 0; i < this.remembrances.length; i += size) {
      this.remembranceRows.push(this.remembrances.slice(i, i + size));
    }
  }


  startDrag(event: MouseEvent | Touch): void {
    this.isDragging = true;
    this.lastX = event.clientX;
    this.lastY = event.clientY;
  }

  onDrag(event: MouseEvent | Touch): void {
    if (!this.isDragging) return;

    const dx = event.clientX - this.lastX;
    const dy = event.clientY - this.lastY;

    // For mobile, optionally increase drag distance slightly
    const isTouch = 'TouchEvent' in window && event instanceof Touch;
    const ratio = isTouch ? 1.2 : 1; // slightly more sensitive on touch

    this.offsetX += dx * ratio;
    this.offsetY += dy * ratio;

    this.velocityX = dx * ratio;
    this.velocityY = dy * ratio;

    this.clampOffsets();

    this.lastX = event.clientX;
    this.lastY = event.clientY;
  }


  endDrag(): void {
    this.isDragging = false;
  }

  animateDrag(): void {
    if (!this.isDragging) {
      this.offsetX += this.velocityX;
      this.offsetY += this.velocityY;

      this.velocityX *= 0.9;
      this.velocityY *= 0.9;

      this.clampOffsets();
    }

    requestAnimationFrame(this.animateDrag.bind(this));
  }

  clampOffsets(): void {
    const viewW = window.innerWidth;
    const viewH = window.innerHeight;

    const contentW = this.bgWidth * this.zoomLevel;
    const contentH = this.bgHeight * this.zoomLevel;

    const minX = viewW - contentW;
    const minY = viewH - contentH;

    this.offsetX = Math.min(0, Math.max(minX, this.offsetX));
    this.offsetY = Math.min(0, Math.max(minY, this.offsetY));
  }

  dragByDirection(direction: 'up' | 'down' | 'left' | 'right'): void {
    const dragAmount = 100;
    let targetX = this.offsetX;
    let targetY = this.offsetY;

    switch (direction) {
      case 'up':
        targetY += dragAmount;
        break;
      case 'down':
        targetY -= dragAmount;
        break;
      case 'left':
        targetX += dragAmount;
        break;
      case 'right':
        targetX -= dragAmount;
        break;
    }

    // Clamp target positions
    const viewW = window.innerWidth;
    const viewH = window.innerHeight;
    const minX = viewW - this.bgWidth * this.zoomLevel;
    const minY = viewH - this.bgHeight * this.zoomLevel;

    targetX = Math.min(0, Math.max(minX, targetX));
    targetY = Math.min(0, Math.max(minY, targetY));

    this.animateToPosition(targetX, targetY);
  }

  animateToPosition(targetX: number, targetY: number): void {
    const steps = 15;
    let currentStep = 0;
    const startX = this.offsetX;
    const startY = this.offsetY;
    const deltaX = (targetX - startX) / steps;
    const deltaY = (targetY - startY) / steps;

    const animate = () => {
      if (currentStep < steps) {
        this.offsetX += deltaX;
        this.offsetY += deltaY;
        currentStep++;
        requestAnimationFrame(animate);
      } else {
        this.offsetX = targetX;
        this.offsetY = targetY;
      }
    };

    animate();
  }

  canDrag(direction: 'up' | 'down' | 'left' | 'right'): boolean {
    const viewW = window.innerWidth;
    const viewH = window.innerHeight;
    const minX = viewW - this.bgWidth * this.zoomLevel;
    const minY = viewH - this.bgHeight * this.zoomLevel;

    switch (direction) {
      case 'up':
        return this.offsetY < 0;
      case 'down':
        return this.offsetY > minY;
      case 'left':
        return this.offsetX < 0;
      case 'right':
        return this.offsetX > minX;
      default:
        return false;
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const viewW = window.innerWidth;
      const viewH = window.innerHeight;
      const bgW = this.bgWidth;
      const bgH = this.bgHeight;

      this.offsetX = (viewW - bgW) / 2;
      this.offsetY = (viewH - bgH) / 2;
    });

    // Prevent browser scrolling on mobile touchmove
    const dragEl = document.querySelector('.mainDrag');
    if (dragEl) {
      dragEl.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
    }
  }





}
