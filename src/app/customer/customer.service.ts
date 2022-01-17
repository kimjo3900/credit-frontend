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

    customer!: Customer;
    statementTransactions!: FinancialRecord[];
    month!: string;
    year!: number;

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

    // Getter and setter for currently signed in customer
    getCustomer(): Customer {
        return this.customer;
    }

    setCustomer(customer: Customer) {
        this.customer = customer;
    }

    // Getter and setter for last month's transactions to view on Statements page
    getStatementTransactions(): FinancialRecord[] {
        return this.statementTransactions;
    }

    setStatementTransactions(financialRecord: FinancialRecord[]) {
        this.statementTransactions = financialRecord;
    }

    getMonth(): string {
        return this.month;
    }

    setMonth(month: string) {
        this.month = month;
    }

    getYear(): number {
        return this.year;
    }

    setYear(year: number) {
        this.year = year;
    }


    handleError(handleError: any): Observable<never> {
        return throwError ('Method not implemented.');
    }
}

export interface FinancialRecord {
    date: string;
    biller: string;
    amount: number;
  }