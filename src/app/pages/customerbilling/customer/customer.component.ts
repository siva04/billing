import { Component, OnInit, ViewChild } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

import { DialoguecComponent } from './dialoguec/dialoguec.component';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CustomerService } from '../../../service/customer.service';
import { environment } from '../../../../environments/environment.development';



@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [MatButtonModule,MatDialogModule, MatPaginator, MatPaginatorModule, MatSort, MatSortModule, MatTableModule, MatInputModule, MatFormFieldModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
  providers:  [ CustomerService ]
})

export class CustomerComponent implements OnInit  {
  displayedColumns: string[] = ['id', 'customerName', 'customerAdress', 'customerEmail','customerPhoneno','customerGstno','logo','Action'];
  dataSource: MatTableDataSource<any>;
  public totalItems:any = 0;
  public paginat = {
    page : 0,
    size : 0
  };
  public env = environment.apiUrl;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public dialog: MatDialog,public CustomerService : CustomerService) {
  

  }

  ngOnInit() {
    this.fetchData(0,5);
  }

  fetchData(skip: number, limit: number) {

  this.CustomerService.getCustomer(skip,limit).subscribe(r=>{
    this.dataSource = new MatTableDataSource(r.data);
    this.totalItems = r.count;
  },err=>{
    console.log(err);
  })
 
  }

  onPageChange(event:PageEvent){
    this.paginat = {
      page : event.pageIndex*event.pageSize,
      size : event.pageSize
    }


    this.fetchData(event.pageIndex*event.pageSize , event.pageSize)

  }

  onEdit(id:any){

    this.CustomerService.getCustomerById(id).subscribe(res=>{
    
      let data = res.data;
      let dialogRef = this.dialog.open(DialoguecComponent, {
        height: '100svh',
        width: '50%',
        data : data
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        this.fetchData(this.paginat.page,this.paginat.size);
      });
    },err=>{
      console.log(err);
    })

   
  }

  onDelete(id:String,name : String){
    if(confirm("Are you sure to delete "+ name)){
          this.CustomerService.deleteCustomer(id).subscribe(res=>{
            alert("Customer Deleted Successfully")
            this.fetchData(this.paginat.page,this.paginat.size);
          },err=>{
            alert("Customer not deleted")
          })
    }
  }


  addcustomer(){
    let dialogRef = this.dialog.open(DialoguecComponent, {
      height: '100svh',
      width: '50%',
   
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngAfterViewInit() {
  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


