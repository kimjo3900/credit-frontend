import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
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
    priorMonth!: number;
    monthNum!: number;
    priorYear!: number;
    currYear!: number;
    account!: number;
    balance!: number;
    totCredit!: number;
    availCredit!: number;

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

    // Getters and setters
    getCustomer(): Customer {
        return this.customer;
    }

    setCustomer(customer: Customer) {
        this.customer = customer;
    }

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

    getMonthNum(): number {
        return this.monthNum;
    }

    setMonthNum(month: number) {
        this.monthNum = month;
    }

    getPriorMonth(): number {
        return this.priorMonth;
    }

    setPriorMonth(month: number) {
        this.priorMonth = month;
    }

    getPriorYear(): number {
        return this.priorYear;
    }

    setPriorYear(year: number) {
        this.priorYear = year;
    }

    getCurrYear(): number {
        return this.currYear;
    }

    setCurrYear(year: number) {
        this.currYear = year;
    }

    getAccount(): number {
        return this.account;
    }

    setAccount(account: number) {
        this.account = account;
    }

    getBalance(): number {
        return this.balance;
    }

    setBalance(balance: number) {
        this.balance = balance;
    }


    getTotCredit(): number {
        return this.totCredit;
    }

    setTotCredit(totCredit: number) {
        this.totCredit = totCredit;
    }

    getAvailCredit(): number {
        return this.availCredit;
    }

    setAvailCredit(availCredit: number) {
        this.availCredit = availCredit;
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