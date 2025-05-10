import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { PaymentType} from "../model/student.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {PaymentsService} from "../services/payments.service";

@Component({
  selector: 'app-add-new-component',
  templateUrl: './add-new-component.component.html',
  styleUrl: './add-new-component.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewComponentComponent implements OnInit{
  paymentsTypes!:Array<PaymentType>;
  form!:FormGroup;
  code!:any;
  isSpinning:boolean=false;

  constructor(private fb:FormBuilder,private activatedRoute:ActivatedRoute,private paymentService:PaymentsService) {
  }


  ngOnInit(): void {
    this.code = this.activatedRoute.snapshot.paramMap.get('code')
    this.paymentsTypes = [PaymentType.CHECK,PaymentType.CASH,PaymentType.TRANSFER,PaymentType.DEPOSIT]
    this.form = this.fb.group(
      {
        date: this.fb.control(''),
        amount: this.fb.control(''),
        code: this.fb.control(this.code),
        paymentsType: this.fb.control(''),
        fileSource: this.fb.control(''),
        fileName: this.fb.control('')
      }
    )
  }

  protected readonly PaymentType = PaymentType;

  selectFile(event:any) {
    if (event.target.files.length > 0){
      let file = event.target.files[0]
      let fileName = file.name;
      this.form.patchValue({
        fileSource : file,
        fileName : fileName
      })
    }

  }

  savePayment() {
    this.isSpinning = true;
    let date = this.form.value.date;
    let formatedDate = date.getDay()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()
    let formData = new FormData()
    formData.set("date",formatedDate)
    formData.set("amount",this.form.value.amount)
    formData.set("paymentType",this.form.value.paymentsType)
    formData.set("file",this.form.value.fileSource)
    formData.set("code",this.form.value.code)
    this.paymentService.savePayment(formData).subscribe({
      next: value => {
        this.isSpinning = false;
        alert("Payment saved")
      },
      error: err => {
        console.log(err)
      }
    })

  }
}
