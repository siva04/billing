import { Component , Inject, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import { CustomerService } from "./../../../../service/customer.service";


@Component({
  selector: 'app-dialoguec',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule, MatButtonModule, MatDialogModule ],
  templateUrl: './dialoguec.component.html',
  styleUrl: './dialoguec.component.scss',
  providers:  [ CustomerService ]
})


export class DialoguecComponent implements OnInit {

  constructor(public dialoge: MatDialogRef<DialoguecComponent>,public CustomerService : CustomerService,  @Inject(MAT_DIALOG_DATA) public data: any
  ){
  
  }

  form:any = FormGroup;
  file:any='';


  ngOnInit() {

    this.form = new FormGroup({
      customerName: new FormControl(this.data?.customerName ?? ''),
      customerAdress: new FormControl(this.data?.customerAdress ?? ''),
      customerEmail: new FormControl(this.data?.customerEmail ?? ''),
      customerPhoneno: new FormControl(this.data?.customerPhoneno ?? ''),
      customerGstno : new FormControl(this.data?.customerGstno ?? ''),  
    });

    
  }

  fileupload(e:any){
    this.file = e.target.files[0]
  }

  async onSubmit(){
  
    let formdata = new FormData();
    formdata.append('customerName',this.form.value.customerName);
    formdata.append('customerAdress',this.form.value.customerAdress);
    formdata.append('customerEmail',this.form.value.customerEmail);
    formdata.append('customerPhoneno',this.form.value.customerPhoneno);
    formdata.append('customerGstno',this.form.value.customerGstno);
    formdata.append('logo',this.file);

    if(this.data?._id){
      this.CustomerService.updateCustomerById(this.data?._id,formdata).subscribe(res=>{
        console.log(res);
        this.dialoge.close();
      },err=>{
       console.log(err);
      });
    } else {
      this.CustomerService.postData(formdata).subscribe(res=>{
        console.log(res);
        this.dialoge.close();
      },err=>{
       console.log(err);
      });
    }

  
    
  }
}
