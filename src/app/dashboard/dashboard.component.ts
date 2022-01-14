import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment';
import { Customer } from '../customer/customer';
import { CustomerService } from '../customer/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['date', 'biller', 'amount'];
  dataSource!: FinancialRecord[];

  // get info about the current date
  currentDate = new Date();
  currentMonth = this.currentDate.getMonth()+1;
  currentYear = this.currentDate.getFullYear();
  currentTime = this.currentDate.getTime();

  // variables to keep track of which month 'Recent Transactions' table is showing
  transactionMonth = this.currentMonth;
  transactionYear = this.currentYear;

  uName!: string;
  customer!: Customer;
  totalCredit!: number;
  progress!: number;

  ELEMENT_DATA: FinancialRecord[] = [
    { date: this.formatDate(this.currentDate), biller: 'Walmart', amount: 56.65 },
    { date: this.formatDate(new Date(this.currentTime-100000000)), biller: 'Walmart', amount: 56.65 },
    { date: this.formatDate(new Date(this.currentTime-340000000)), biller: 'Walmart', amount: 56.65 },
    { date: this.formatDate(new Date(this.currentTime-700000000)), biller: 'Walmart', amount: 56.65 },
    { date: this.formatDate(new Date(this.currentTime-710000000)), biller: 'Walmart', amount: 56.65 },
    { date: this.formatDate(new Date(this.currentTime-1100000000)), biller: 'Walmart', amount: 56.65 },
    { date: this.formatDate(new Date(this.currentTime-1400000000)), biller: 'Walmart', amount: 56.65 },
    { date: this.formatDate(new Date(this.currentTime-1450000000)), biller: 'Walmart', amount: 56.65 },
    { date: this.formatDate(new Date(this.currentTime-2000000000)), biller: 'Walmart', amount: 56.65 },
    { date: this.formatDate(new Date(this.currentTime-2200000000)), biller: 'Walmart', amount: 56.65 },
    { date: this.formatDate(new Date(this.currentTime-2500000000)), biller: 'Walmart', amount: 56.65 },
    { date: this.formatDate(new Date(this.currentTime-2800000000)), biller: 'Walmart', amount: 56.65 },
    { date: this.formatDate(new Date(this.currentTime-3500000000)), biller: 'Walmart', amount: 56.65 },
    { date: this.formatDate(new Date(this.currentTime-4200000000)), biller: 'Walmart', amount: 56.65 },
    { date: this.formatDate(new Date(this.currentTime-4300000000)), biller: 'Walmart', amount: 56.65 },
    { date: this.formatDate(new Date(this.currentTime-4400000000)), biller: 'Walmart', amount: 56.65 },
    { date: this.formatDate(new Date(this.currentTime-4800000000)), biller: 'Walmart', amount: 56.65 },
    { date: this.formatDate(new Date(this.currentTime-5000000000)), biller: 'Walmart', amount: 56.65 },
    { date: this.formatDate(new Date(this.currentTime-5500000000)), biller: 'Walmart', amount: 56.65 },
    { date: this.formatDate(new Date(this.currentTime-5600000000)), biller: 'Walmart', amount: 56.65 },
    { date: this.formatDate(new Date(this.currentTime-5900000000)), biller: 'Walmart', amount: 56.65 },
    { date: this.formatDate(new Date(this.currentTime-6400000000)), biller: 'Walmart', amount: 56.65 },
    { date: this.formatDate(new Date(this.currentTime-6500000000)), biller: 'Walmart', amount: 56.65 },
    { date: this.formatDate(new Date(this.currentTime-6550000000)), biller: 'Walmart', amount: 56.65 },
    { date: this.formatDate(new Date(this.currentTime-6900000000)), biller: 'Walmart', amount: 56.65 },
    { date: this.formatDate(new Date(this.currentTime-7100000000)), biller: 'Walmart', amount: 56.65 },
  ];

  constructor(private router: Router, private customerService: CustomerService, private route: ActivatedRoute, private toaster: MatSnackBar) { }

  ngOnInit(): void {
    this.uName = <string>this.route.snapshot.paramMap.get('username');

    // attempt to get customer by uName
    this.customerService.getCustomerByUName(this.uName).subscribe(
      (response: Customer) => {
        this.customer = response;

        this.totalCredit = this.customer.balance + this.customer.remainingCredit;
        this.progress = this.customer.balance / this.totalCredit * 100;

        // Populate transaction history if bob.jones
        if (this.uName == 'bob.jones') {
          var arr: FinancialRecord[] = [];
          for (var i=0; i<this.ELEMENT_DATA.length; i++) {
            if (this.getMonth(this.ELEMENT_DATA[i].date) == this.transactionMonth && this.getYear(this.ELEMENT_DATA[i].date) == this.transactionYear)
              arr.push(this.ELEMENT_DATA[i]);
          }
          this.dataSource = arr;
        }
        // Otherwise leave blank to simulate new customer
        else this.dataSource = EMPTY_DATA;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  openSnackBar() {
    this.toaster.open('Bills Paid', 'Close');
  }

  goBackMonth(): void {
    // Update Transaction vars
    if (this.transactionMonth == 1) {
      this.transactionMonth = 12;
      this.transactionYear -= 1;
    }
    else
      this.transactionMonth--;

    // Update datasource
    var arr: FinancialRecord[] = [];
    for (var i=0; i<this.ELEMENT_DATA.length; i++) {
      if (this.getMonth(this.ELEMENT_DATA[i].date) == this.transactionMonth && this.getYear(this.ELEMENT_DATA[i].date) == this.transactionYear)
        arr.push(this.ELEMENT_DATA[i]);
    }
    this.dataSource = arr;
  }

  goForwardMonth(): void {
    // Update Transaction vars
    if (this.transactionMonth == 12) {
      this.transactionMonth = 1;
      this.transactionYear += 1;
    }
    else
      this.transactionMonth++;

    // Update datasource
    var arr: FinancialRecord[] = [];
    for (var i=0; i<this.ELEMENT_DATA.length; i++) {
      if (this.getMonth(this.ELEMENT_DATA[i].date) == this.transactionMonth && this.getYear(this.ELEMENT_DATA[i].date) == this.transactionYear)
        arr.push(this.ELEMENT_DATA[i]);
    }
    this.dataSource = arr;
  }

  goCurrentMonth(): void {
    // Update Transaction vars
    this.transactionMonth = this.currentMonth;
    this.transactionYear = this.currentYear;

    // Update datasource
    var arr: FinancialRecord[] = [];
    for (var i=0; i<this.ELEMENT_DATA.length; i++) {
      if (this.getMonth(this.ELEMENT_DATA[i].date) == this.transactionMonth && this.getYear(this.ELEMENT_DATA[i].date) == this.transactionYear)
        arr.push(this.ELEMENT_DATA[i]);
    }
    this.dataSource = arr;
  }

  onLogout(): void {
    let poolData = {
      UserPoolId: environment.cognitoUserPoolId,
      ClientId: environment.cognitoAppClientId
    };
    let userPool = new CognitoUserPool(poolData);
    let cognitoUser = userPool.getCurrentUser();
    cognitoUser?.signOut();
    this.router.navigate(["/"]);
  }

  // Return a string representation of a date as 'MM/DD/YYYY'
  formatDate(date: Date): string {
    return date.getMonth()+1 + '/' + date.getDate() + '/' + date.getFullYear();
  }

  getMonth(date: string): number {
    return parseInt((date.split("/")[0]));
  }

  getYear(date: string): number {
    return parseInt((date.split("/")[2]));
  }
}

export interface FinancialRecord {
  date: string;
  biller: string;
  amount: number;
}

const EMPTY_DATA: FinancialRecord[] = [];