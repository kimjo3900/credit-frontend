import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../customer/customer';
import { CustomerService } from '../customer/customer.service';

@Component({
  selector: 'app-statements',
  templateUrl: './statements.component.html',
  styleUrls: ['./statements.component.css']
})
export class StatementsComponent implements OnInit {
  customer!: Customer;
  displayedColumns: string[] = ['date', 'biller', 'amount'];
  statementTransactions: FinancialRecord[] = [];
  priorMonth: string = '';
  priorYear!: number;
  currMonth!: number;
  currYear!: number;
  account!: number;
  balance!: number;
  prevBalance: string = '$0';
  paymentCredits: string = '$0';
  minPayment: string = '$0';
  totCredit!: number;
  availCredit!: number;

  maxDays: number[] = [
    31,28,31,30,31,30,31,31,30,31,30,31
  ];

  constructor(customerService: CustomerService) {
    this.customer = customerService.getCustomer();
    this.statementTransactions = customerService.getStatementTransactions();
    this.priorMonth = customerService.getMonth();
    this.priorYear = customerService.getPriorYear();
    this.currMonth = customerService.getMonthNum();
    this.currYear = customerService.getCurrYear();
    this.account = customerService.getAccount();
    this.balance = customerService.getBalance();
    this.totCredit = customerService.getTotCredit();
    this.availCredit = customerService.getAvailCredit();

    if (this.customer.username == 'bob.jones') {
      this.prevBalance = '$639.72';
      this.paymentCredits = '-$639.72';
      this.minPayment = '$50.00';
    }
  }

  ngOnInit(): void { 
  }

}

export interface FinancialRecord {
  date: string;
  biller: string;
  amount: number;
}