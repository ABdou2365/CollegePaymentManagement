import {Component, OnInit, ViewChild} from '@angular/core';
import {PaymentsService} from "../services/payments.service";
import {ActivatedRoute} from "@angular/router";
import {Payment} from "../model/student.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent implements OnInit{


  payments!:Array<Payment>;
  dataSource!:MatTableDataSource<Payment, MatPaginator>;
  displayedColumns:String[] = ['id','date','amount','paymentType','paymentStatus','firstName']
  code!:any;


  constructor(private paymentService: PaymentsService,private activatedRouter:ActivatedRoute) {
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



    ngOnInit(): void {
        this.code = this.activatedRouter.snapshot.paramMap.get('code')
        this.paymentService.loadPaymentsByCode(this.code).subscribe({
          next: data => {
              this.payments = data
              this.dataSource = new MatTableDataSource(this.payments);
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
          },
          error: err => {
            console.log(err)
          }
        })
    }

}
