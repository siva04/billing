import { Component, OnInit, ViewChild } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { InvoiceService } from '../../../service/invoice.service';
import { environment } from '../../../../environments/environment.development';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PdftemplateComponent } from './pdftemplate/pdftemplate.component';
import { log } from 'console';


@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [MatButtonModule,MatDialogModule, MatPaginator, MatPaginatorModule, MatSort, MatSortModule, MatTableModule, MatInputModule, MatFormFieldModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss',
  providers : [InvoiceService]
})
export class InvoiceComponent implements OnInit {

  displayedColumns: string[] = [ 'invoiceno' , 'customer', 'cgst', 'sgst' , 'subtotal' ,'totalAmount' , 'Action'];
  dataSource: MatTableDataSource<any>;
  public totalItems:any = 0;
  public paginat = {
    page : 0,
    size : 0
  };
  public env = environment.apiUrl;
  blobUrl: SafeResourceUrl;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public dialog: MatDialog,public invoiceservice : InvoiceService,private sanitizer: DomSanitizer) {
 



  }

  ngOnInit() {
    this.fetchData(0,5);
  }

  fetchData(skip: number, limit: number) {

    this.invoiceservice.getInvoice(skip,limit).subscribe(r=>{
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

    onEdit(id:String){



      this.invoiceservice.getInvoiceById(id).subscribe(res=>{
    
        let data = res.data;
        let dialogRef = this.dialog.open(AddInvoiceComponent, {
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
            this.invoiceservice.deleteInvoice(id).subscribe(res=>{
              alert("Invoice Deleted Successfully")
              this.fetchData(this.paginat.page,this.paginat.size);
            },err=>{
              alert("Invoice not deleted")
            })
      }
    }

  
  generateInvoice(){
    let dialogRef = this.dialog.open(AddInvoiceComponent, {
      height: '98svh',
      width: '100%',
   
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchData(this.paginat.page,this.paginat.size);
      console.log(`Dialog result: ${result}`);
    });
  }

  ngAfterViewInit() {
  }

  onPreview(id:String){
    this.invoiceservice.getPdfBlob(id).subscribe(blob => {
      this.blobUrl = this.createBlobUrl(blob);

      let dialogRef = this.dialog.open(PdftemplateComponent, {
        height: '100svh',
        width: '50%',
        data : this.blobUrl
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        this.fetchData(this.paginat.page,this.paginat.size);
      });

    });

  }

  createBlobUrl(blob: Blob): SafeResourceUrl {
    console.log(blob)
    const objectUrl = URL.createObjectURL(blob);
    return this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


