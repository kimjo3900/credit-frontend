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
  statementTransactions: FinancialRecord[] = [];
  month: string = '';
  year!: number;

  constructor(customerService: CustomerService) {
    this.customer = customerService.getCustomer();
    this.statementTransactions = customerService.getStatementTransactions();
    this.month = customerService.getMonth();
    this.year = customerService.getYear();
  }

  ngOnInit(): void { 
  }

}

export interface FinancialRecord {
  date: string;
  biller: string;
  amount: number;
}