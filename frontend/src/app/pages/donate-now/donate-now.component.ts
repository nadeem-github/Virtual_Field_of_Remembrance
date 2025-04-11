import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-donate-now',
  templateUrl: './donate-now.component.html',
  styleUrls: ['./donate-now.component.scss']
})
export class DonateNowComponent {
  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const script = this.renderer.createElement('script');
    script.src = 'https://cdn.raisely.com/v3/public/embed.js';
    script.type = 'text/javascript';
    script.async = true;
    this.renderer.appendChild(document.body, script);
  }
}
