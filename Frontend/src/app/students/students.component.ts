import {Component, OnInit, ViewChild} from '@angular/core';
import {Payment, Student} from "../model/student.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {PaymentsService} from "../services/payments.service";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit{

  public students!:Array<Student>;
  public dataSource!:MatTableDataSource<Student, MatPaginator>;
  public displayedColumns:String[] = ['id','firstName','lastName','programId','payments']

  constructor(private paymentsService: PaymentsService,private router:Router) {
  }

  // THIS IS TELLING TYPESCRIPT TO FIND AN HTML ELEMENT CALLED <mat-paginator>
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  ngOnInit(): void {
    this.paymentsService.loadStudents().subscribe({
      next : data => {
        this.students = data;
        // DataSource instance will be the best way to manage data.
        // The DataSource is meant to serve as a place to encapsulate any
        // sorting, filtering, pagination, and data retrieval logic specific to the application.
        this.dataSource = new MatTableDataSource(this.students)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: err => {
        console.log(err)
      }
    })
  }

  consultPaymentsByStudent(code:string) {
    this.router.navigateByUrl(`/admin/student-details/${code}`)
  }
}
