import { Injectable } from '@angular/core';
import { CreditCard } from '../interfaces/credit-card';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  creditCardData: CreditCard = {
    cardholder: "Jane Appleseed",
    cardNumber: "0000 0000 0000 0000",
    mm: "00",
    yy: "00",
    cvc: "000"
  };

  formatValues(): void {
    if (this.creditCardData.mm === null || this.creditCardData.mm === undefined) {
      this.creditCardData.mm = "00";
    } else {
      this.creditCardData.mm = String(this.creditCardData.mm).padStart(2, '0');
    }

    if (this.creditCardData.yy === null || this.creditCardData.yy === undefined) {
      this.creditCardData.yy = "00";
    } else {
      this.creditCardData.yy = String(this.creditCardData.yy).padStart(2, '0');
    }
  }
}
