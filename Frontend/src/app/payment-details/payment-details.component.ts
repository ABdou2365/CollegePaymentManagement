import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PaymentsService} from "../services/payments.service";

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css'
})
export class PaymentDetailsComponent implements OnInit{

  paymentId!:number;
  src:any;

  constructor(private activatedRoute:ActivatedRoute,private paymentsService:PaymentsService ) {
  }


    ngOnInit(): void {
    this.paymentId = this.activatedRoute.snapshot.params['id']
    this.paymentsService.consultPayment(this.paymentId).subscribe(
      {
        // here we are using blob to consume the pdf, without it we can't consume it.
        next: data => {
          let blob = new Blob([data],{type: 'application/pdf'})
          this.src = window.URL.createObjectURL(blob)
        },
        error: err => {
          console.log(err)
        }
      }
    )
    }

}
