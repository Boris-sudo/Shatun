import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  styles: ``,
  template: `
    <div class="container">

    </div>
  `
})
export class App {
  protected readonly title = signal('shatun');
}
