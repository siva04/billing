import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { jsPDF } from "jspdf";
import { AddInvoiceComponent } from '../add-invoice/add-invoice.component';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-bill-preview',
  standalone: true,
  imports: [MatButtonModule, MatIconModule , DatePipe],
  templateUrl: './bill-preview.component.html',
  styleUrl: './bill-preview.component.scss',
  
})
export class BillPreviewComponent {

  constructor(public dialoge: MatDialogRef<AddInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    // public dialog: MatDialog
  ){
    console.log(this.data);
  }

  // @ViewChild("printData", { static: true }) printData: ElementRef;
  actionBtnSec: boolean = true;
  
  downloadPdf() {
    // const DATA = this.printData.nativeElement;
    // const doc: jsPDF = new jsPDF("p", "mm", "a4");
    // doc.html(DATA, {
    //   callback: (doc) => {
    //     doc.output("dataurlnewwindow");
    //   }
    // });

    // doc.save('asdfghj' + '.pdf');
    this.actionBtnSec = false;
    setTimeout(() => {window.print()}, 0);
    setTimeout(() => {this.actionBtnSec = true; }, 1000);
  }
  closePreview(){
    this.dialoge.close()
  }

}
