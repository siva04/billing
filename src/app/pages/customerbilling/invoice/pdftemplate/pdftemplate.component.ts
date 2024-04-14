import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pdftemplate',
  standalone: true,
  imports: [],
  templateUrl: './pdftemplate.component.html',
  styleUrl: './pdftemplate.component.scss'
})
export class PdftemplateComponent {

  constructor( @Inject(MAT_DIALOG_DATA) public data: any){
    console.log(this.data);
  }

}
