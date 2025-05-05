import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Payment} from "../model/student.model";

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private http: HttpClient) { }

  loadPayments() : Observable<Array<Payment>>{
    // On a mentioné ici le type est un array de Payment bcs( Type 'Observable<Object>' is not assignable to type 'Observable<Payment[]>'.
    return this.http.get<Array<Payment>>(`${environment.backendHost}/payments`);
  }
}
