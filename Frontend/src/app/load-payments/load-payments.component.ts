import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-load-payments',
  templateUrl: './load-payments.component.html',
  styleUrl: './load-payments.component.css'
})
export class LoadPaymentsComponent{

  // public payments:any;
  // public dataSource:any;
  // public displayedColumns:String[] = ['id','date','amount','paymentType','paymentStatus','firstName']
  //
  //
  //   constructor(private http: HttpClient) {
  //   }
  //
  //   // THIS IS TELLING TYPESCRIPT TO FIND AN HTML ELEMENT CALLED <mat-paginator>
  //   @ViewChild(MatPaginator) paginator!: MatPaginator;
  //   @ViewChild(MatSort) sort!: MatSort;
  //
  //
  //
  //   ngOnInit(): void {
  //       this.http.get("http://localhost:9090/payments")
  //         .subscribe({
  //           next : data => {
  //             this.payments = data;
  //             // DataSource instance will be the best way to manage data.
  //             // The DataSource is meant to serve as a place to encapsulate any
  //             // sorting, filtering, pagination, and data retrieval logic specific to the application.
  //             this.dataSource = new MatTableDataSource(this.payments)
  //             this.dataSource.paginator = this.paginator;
  //             this.dataSource.sort = this.sort;
  //           },
  //           error: err => {
  //             console.log(err)
  //           }
  //         })
  //   }
}
