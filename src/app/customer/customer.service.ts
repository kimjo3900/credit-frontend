import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from './customer';

@Injectable({
    providedIn: 'root'
  })
export class CustomerService {
    
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    public getCustomers(): Observable<Customer[]> {
        return this.http.get<Customer[]>(`${this.apiServerUrl}/customer/all`);
    }
    
    public addCustomer(customer: Customer): Observable<Customer> {
        return this.http.post<Customer>(`${this.apiServerUrl}/customer/add`, customer);
    }

    public updateCustomer(customer: Customer): Observable<Customer> {
        return this.http.put<Customer>(`${this.apiServerUrl}/customer/update`, customer);
    }

    public deleteCustomer(customerId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/customer/delete/${customerId}`);
    }

    public getCustomerByUName(uName: string): Observable<Customer> {
        return this.http.get<Customer>(`${this.apiServerUrl}/customer/find/${uName}`);
    }


    handleError(handleError: any): Observable<never> {
        return throwError ('Method not implemented.');
    }
}