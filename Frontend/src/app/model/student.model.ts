

export interface Student{
  id:string,
  firstName:string,
  lastName:string,
  code:string,
  programCode:string,
  programId:string,
  Photo:string
}

export interface Payment{
  id:number,
  date:string,
  amount:number,
  paymentType:string,
  paymentStatus:string,
  file:string,
  student:Student
}

export enum PaymentType{
  CASH,CHECK,TRANSFER,DEPOSIT
}

export enum PaymentStatus{
  CREATED,VALIDATED,REJECTED
}

