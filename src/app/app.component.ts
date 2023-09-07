import { Component, ViewEncapsulation } from '@angular/core';
import { CardsComponent } from './components/cards/cards.component';
import { FormComponent } from './components/form/form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CardsComponent,
    FormComponent
  ],
  template: `
    <main>
      <app-cards></app-cards>
      <app-form></app-form>
    </main>
  `,
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  
}
