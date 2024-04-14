import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {
   // console.log(environment.apiUrl);
   }

   postData(data:any){
    return  this.http.post<any>(`${environment.apiUrl}/customer`,data);
  }

  getCustomer(skip=0,limit=0){
    return this.http.get<any>(`${environment.apiUrl}/customer?skip=${skip}&limit=${limit}`);
  }

  getCustomerById(id:String){
    return this.http.get<any>(`${environment.apiUrl}/customer/${id}`);
  }

  updateCustomerById(id:String,data:any){
    return this.http.patch<any>(`${environment.apiUrl}/customer/${id}`,data);
  }

  deleteCustomer(id:String){
    return this.http.delete<any>(`${environment.apiUrl}/customer/${id}`);
  }

}
