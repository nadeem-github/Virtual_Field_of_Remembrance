import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-buy-wooden-cross',
  templateUrl: './buy-wooden-cross.component.html',
  styleUrls: ['./buy-wooden-cross.component.scss']
})
export class BuyWoodenCrossComponent {

  isLoading = true;
  constructor(private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    const script = this.renderer.createElement('script');
    script.src = 'https://cdn.raisely.com/v3/public/embed.js';
    script.type = 'text/javascript';
    script.async = true;
    this.renderer.appendChild(document.body, script);
  }
}
