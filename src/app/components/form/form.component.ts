import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { SuccessModalComponent } from '../success-modal/success-modal.component';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreditCardService } from 'src/app/services/credit-card.service';

@Component({
  selector: 'app-form',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    SuccessModalComponent,
    CommonModule,
    ReactiveFormsModule],
  template: `
    <form
      [formGroup]="cardForm"
      (ngSubmit)="submitForm()"
      *ngIf="!completedForm"
    >
      <div class="form_control">
        <label for="cardholder">Cardholder name</label>
        <input
          type="text"
          [class.error]="cardholder?.invalid && submitBtnClicked"
          name="cardholder"
          id="cardholder"
          placeholder="e.g. Jane Appleseed"
          formControlName="cardholder"
        >
        <div *ngIf="submitBtnClicked">
          <small *ngIf="cardholder?.hasError('required')">Can't be blank</small>
          <small *ngIf="cardholder?.hasError('maxlength')">Cardholder name must consists of max. 50 characters length</small>
        </div>
      </div>
      <div class="form_control">
        <label for="card_number">Card number</label>
        <input
          type="text"
          [class.error]="cardNumber?.invalid && submitBtnClicked"
          name="card_number"
          id="card_number"
          placeholder="e.g. 1234 5678 9123 0000"
          formControlName="cardNumber"
        >
        <div *ngIf="submitBtnClicked">
          <small *ngIf="cardNumber?.hasError('required')">Can't be blank</small>
          <small *ngIf="cardNumber?.hasError('pattern')">Wrong format, numbers only</small>
        </div>
      </div>
      <div class="form_inputs_group">
        <div class="form_control">
          <label for="expiration_date">Exp. date (mm/yy)</label>
          <div class="expiration_date_inputs">
            <div>
              <input
                type="number"
                [class.error]="mm?.invalid && submitBtnClicked"
                name="mm"
                id="expiration_date"
                placeholder="MM"
                formControlName="mm"
              >
              <input
                type="number"
                [class.error]="yy?.invalid && submitBtnClicked"
                name="yy"
                placeholder="YY"
                formControlName="yy"
              >
            </div>
            <div *ngIf="submitBtnClicked">
              <small *ngIf="mm?.hasError('required') || yy?.hasError('required')">Can't be blank</small>
              <small *ngIf="mm?.hasError('min') || mm?.hasError('max') || yy?.hasError('min') || yy?.hasError('max')">Invalid month or year</small>
            </div>
          </div>
        </div>
        <div class="form_control">
          <label for="cvc">CVC</label>
          <input
            type="number"
            [class.error]="cvc?.invalid && submitBtnClicked"
            name="cvc"
            id="cvc"
            placeholder="e.g. 123"
            formControlName="cvc"
          >
          <div *ngIf="submitBtnClicked">
            <small *ngIf="cvc?.hasError('required')">Can't be blank</small>
            <small *ngIf="cvc?.hasError('pattern')">Wrong format, numbers only</small>
          </div>
        </div>
      </div>
      <button class="confirm_btn">Confirm</button>
    </form>
    <app-success-modal *ngIf="completedForm" (onBackToForm)="backToForm()"></app-success-modal>
  `,
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {
  cardForm!: FormGroup<any>;
  completedForm = false;
  submitBtnClicked = false; 

  constructor(
    private fb: FormBuilder,
    public creditCard: CreditCardService
  ) {}

  ngOnInit(): void {
    this.cardForm = this.fb.group({
      cardholder: [
        '',
        [
          Validators.required,
          Validators.maxLength(50)
        ]
      ],
      cardNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$/)
        ]
      ],
      mm: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(12)
        ]
      ],
      yy: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(99)
        ]
      ],
      cvc: [
        '', [
          Validators.required,
          Validators.pattern(/^[0-9]{3}$/)
        ]
      ]
    });

    this.cardForm.valueChanges.subscribe(form => {
      this.creditCard.creditCardData = form;
      this.creditCard.formatValues();
    });
  }

  submitForm(): void {
    this.submitBtnClicked = true;
    if (this.cardForm.valid) {
      this.completedForm = true;
      this.submitBtnClicked = false;
    }
  }

  backToForm(): void {
    this.cardForm.patchValue({
      cardholder: '',
      cardNumber: '',
      mm: '',
      yy: '',
      cvc: ''
    });

    this.creditCard.creditCardData = {
      cardholder: "Jane Appleseed",
      cardNumber: "0000 0000 0000 0000",
      mm: "00",
      yy: "00",
      cvc: "000"
    };

    this.completedForm = false;
  }

  get cardholder() {
    return this.cardForm.get('cardholder');
  }

  get cardNumber() {
    return this.cardForm.get('cardNumber');
  }

  get mm() {
    return this.cardForm.get('mm');
  }

  get yy() {
    return this.cardForm.get('yy');
  }

  get cvc() {
    return this.cardForm.get('cvc');
  }
}
