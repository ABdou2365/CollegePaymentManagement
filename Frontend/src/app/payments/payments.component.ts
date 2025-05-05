import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {PaymentsService} from "../services/payments.service";
import {Payment} from "../model/student.model";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent implements OnInit{

  public payments!:Array<Payment>;
  public dataSource!:MatTableDataSource<Payment, MatPaginator>;
  public displayedColumns:String[] = ['id','date','amount','paymentType','paymentStatus','firstName']


  constructor(private paymentsService: PaymentsService) {
  }

  // THIS IS TELLING TYPESCRIPT TO FIND AN HTML ELEMENT CALLED <mat-paginator>
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  ngOnInit(): void {
    this.paymentsService.loadPayments().subscribe({
        next : data => {
          this.payments = data;
          // DataSource instance will be the best way to manage data.
          // The DataSource is meant to serve as a place to encapsulate any
          // sorting, filtering, pagination, and data retrieval logic specific to the application.
          this.dataSource = new MatTableDataSource(this.payments)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: err => {
          console.log(err)
        }
      })
  }



}
