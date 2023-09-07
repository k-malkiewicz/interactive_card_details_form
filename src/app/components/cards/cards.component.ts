import { Component, ViewEncapsulation } from '@angular/core';
import { CreditCardService } from 'src/app/services/credit-card.service';

@Component({
  selector: 'app-cards',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [],
  template: `
    <article class="cards">
      <div class="card_front">
        <svg width="84" height="47" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="23.478" cy="23.5" rx="23.478" ry="23.5" fill="#fff"/>
          <path d="M83.5 23.5c0 5.565-4.507 10.075-10.065 10.075-5.559 0-10.065-4.51-10.065-10.075 0-5.565 4.506-10.075 10.065-10.075 5.558 0 10.065 4.51 10.065 10.075Z" stroke="#fff"/>
        </svg>
        <p class="card_front_number">{{ creditCard.creditCardData.cardNumber }}</p>
        <div>
          <p class="card_front_cardholder">{{ creditCard.creditCardData.cardholder }}</p>
          <div class="card_front_exp_date">
            <span>{{ creditCard.creditCardData.mm }}</span>/<span>{{ creditCard.creditCardData.yy }}</span>
          </div>
        </div>
      </div>
      <div class="card_back">
        <div class="card_back_cvc">{{ creditCard.creditCardData.cvc }}</div>
      </div>
    </article>
  `,
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {
  constructor(public creditCard: CreditCardService) {}
}
