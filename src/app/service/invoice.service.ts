import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }

  postData(data:any){
    return  this.http.post<any>(`${environment.apiUrl}/invoice`,data);
  }

  getInvoice(skip=0,limit=0){
    return this.http.get<any>(`${environment.apiUrl}/invoice?skip=${skip}&limit=${limit}`);
  }

  getInvoiceById(id:String){
    return this.http.get<any>(`${environment.apiUrl}/invoice/${id}`);
  }

  updateInvoiceById(id:String,data:any){
    return this.http.patch<any>(`${environment.apiUrl}/invoice/${id}`,data);
  }

  deleteInvoice(id:String){
    return this.http.delete<any>(`${environment.apiUrl}/invoice/${id}`);
  }

  getPdfBlob(id:String): Observable<Blob> {
    return this.http.get(`${environment.apiUrl}/generateInvoice/${id}`, { responseType: 'blob' });
  }

}
