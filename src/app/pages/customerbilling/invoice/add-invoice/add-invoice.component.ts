import { CUSTOM_ELEMENTS_SCHEMA, Component , OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SelectControlComponent } from '../../../../components/select-control/select-control.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';


export interface IbillingItems  {
  desc: string;
  fromDate: any;
  endDate: any;
  amt: number;
}
@Component({
  selector: 'app-add-invoice',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatDialogModule, MatSelectModule, MatDatepickerModule, SelectControlComponent],
  templateUrl: './add-invoice.component.html',
  styleUrl: './add-invoice.component.scss',
  providers: [provideNativeDateAdapter()],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})

export class AddInvoiceComponent {

  customers: any[] = [
    {name: 'Company No.1', id: 'A', email: 'a@gmail.com', phone: '0987654321', GSTno: '1234', adress: 'no.12, ambattur'},
    {name: 'Company No.1', id: 'A', email: 'a@gmail.com', phone: '0987654321', GSTno: '1234', adress: 'no.12, ambattur'},
    {name: 'Company No.1', id: 'A', email: 'a@gmail.com', phone: '0987654321', GSTno: '1234', adress: 'no.12, ambattur'},
    {name: 'Company No.1', id: 'A', email: 'a@gmail.com', phone: '0987654321', GSTno: '1234', adress: 'no.12, ambattur'},
    {name: 'Company No.1', id: 'A', email: 'a@gmail.com', phone: '0987654321', GSTno: '1234', adress: 'no.12, ambattur'},
  ];

  constructor(public dialoge: MatDialogRef<AddInvoiceComponent>){}

  form:any = FormGroup;
  file:any='';
  billItems: any[] = [
    {desc: '', fromDate: '', endDate: '', amt: ''},
  ];


  ngOnInit() {
    this.form = new FormGroup({
      totalAmount: new FormControl({value:'', disabled: true}),
      customerName: new FormControl(''),
      customerAdress: new FormControl(''),
      customerEmail: new FormControl(''),
      customerPhoneno: new FormControl(''),
      customerGstno : new FormControl(''),  
    });
  }

  fileupload(e:any){
    this.file = e.target.files[0]
  }

  onSubmit(){
    console.log(this.form.value)
    // alert('dsf');
  }

  inputChangeFun(event: any, key?: any, index?: any){
    console.log(event.target.value, key, index)
    // if(key == 'Dates') {
      this.billItems[index][key] = event.target.value
    // }
    // else{
    //   console.log(event.target.value, key, index)
    // }

    console.log('billItems', this.billItems)
  }
  removeBillItem(index:any){
    this.billItems.splice(index, 1);
  }
  addBillItem(){
    this.billItems.push({desc: '', fromDate: '', endDate: '', amt: ''})
  }
}
