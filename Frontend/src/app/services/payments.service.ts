import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Payment, Student} from "../model/student.model";

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private http: HttpClient) { }

  loadPayments() : Observable<Array<Payment>>{
    // On a mentioné ici le type est un array de Payment bcs( Type 'Observable<Object>' is not assignable to type 'Observable<Payment[]>'.
    return this.http.get<Array<Payment>>(`${environment.backendHost}/payments`);
  }

  loadStudents() {
    return this.http.get<Array<Student>>(`${environment.backendHost}/students`)
  }

  loadPaymentsByCode(code:string) : Observable<Array<Payment>>{
    return this.http.get<Array<Payment>>(`${environment.backendHost}/students/${code}/payments`)
  }

  savePayment(fromData:any):Observable<Payment>{
    return this.http.post<Payment>(`${environment.backendHost}/payment`,fromData)
  }

  // ON A AJOUTÉ LE RESPONSE TYPE, POUR INDIQUER A ANGULAR QUE LE RETOUR EST DE TYPE  PDF
  consultPayment(id:number) {
    return this.http.get(`${environment.backendHost}/paymentFile/${id}`,{responseType:"blob"})
  }
}
