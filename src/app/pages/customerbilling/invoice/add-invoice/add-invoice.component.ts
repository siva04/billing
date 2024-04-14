import { CUSTOM_ELEMENTS_SCHEMA, Component , Inject, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SelectControlComponent } from '../../../../components/select-control/select-control.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../../../service/customer.service';
import { InvoiceService } from '../../../../service/invoice.service';


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
  providers: [provideNativeDateAdapter(),CustomerService,InvoiceService],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})

export class AddInvoiceComponent {

  customers: any[] = [];
  form:any = FormGroup;
  file:any='';
  billItems: any[] = [
    {desc: '', fromDate: '', endDate: '', amt: ''},
  ];

  constructor(private formBuilder: FormBuilder , public dialoge: MatDialogRef<AddInvoiceComponent>,public customservice : CustomerService , 
    public invoiceservice : InvoiceService ,  @Inject(MAT_DIALOG_DATA) public data: any){


    this.form = this.formBuilder.group({
      customer: new FormControl(''),
      multiple: this.formBuilder.array([
        this.formBuilder.group({
          description: new FormControl(''),
          fromDate: new FormControl(''),
          endDate: new FormControl(''),
          amt: new FormControl('')
        })
      ]),
      subtotal : new FormControl(''),
      cgst : new FormControl(''),
      sgst : new FormControl(''),
      totalAmount :  new FormControl('')
    });

 if(this.data){
  for (let index = 1; index < this.data.multiple.length; index++) {
    this.addBillItem();
  }
  this.form.patchValue(this.data);
 }



    this.form.get('multiple').valueChanges.subscribe((newValue : any) => {
      var amtt=0;

         amtt =  newValue?.reduce((acc:any,curr:any) => parseFloat(acc) +  parseFloat(curr?.amt == "" ? 0 : curr.amt),0);

         let gst = amtt * 9 / 100;
         let tot = amtt + gst + gst ;
  
        this.form.patchValue({
          "subtotal" : amtt,
          "cgst" : gst,
          "sgst" : gst,
          "totalAmount" : tot
        })
      // You can perform any action with the new value here
    });


    this.customservice.getCustomer().subscribe(res=>{
      this.customers = res.data;
      console.log(this.customers);

      
   },err=>{
     console.log(err)
   });


  }



  ngOnInit() {

  }

  fileupload(e:any){
    this.file = e.target.files[0]
  }

  onSubmit(){

    if(this.data?._id){
        this.invoiceservice.updateInvoiceById(this.data._id,this.form.value).subscribe(res=>{
          console.log(res);
          this.dialoge.close();
        },err=>{
          console.log(err);
        })
    } else {
      this.invoiceservice.postData(this.form.value).subscribe(res=>{
        console.log(res.data);
        this.dialoge.close();
      },error=>{
        console.log(error);
        
      });
    }
  


  }


  removeFormGroup(index: number) {
    this.multiple.removeAt(index);
  }

  get multiple(): FormArray {
    return this.form.get('multiple') as FormArray;
  }

  addBillItem(){
    this.multiple.push(this.formBuilder.group({
      description: '',
      fromDate: '',
      endDate: '',
      amt: ''
    }));
  }

 
}
