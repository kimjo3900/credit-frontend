import { HttpErrorResponse } from '@angular/common/http';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  NgForm,
  AbstractControl,
} from '@angular/forms';
import { CognitoUserPool,CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import CustomValidators from '../providers/CustomValidators';
import { Customer } from '../customer/customer';
import { CustomerService } from '../customer/customer.service';

interface formDataInterface {
  "given_name": string;
  "family_name": string;
  "preferred_username": string;
  [key: string]: string;
};
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class RegisterComponent implements OnInit {
  basicInfo = new FormGroup({
    fname: new FormControl(),
    lname: new FormControl(),
    ssn: new FormControl(),
    bday: new FormControl(),
    address: new FormControl(),
    city: new FormControl(),
    state: new FormControl(),
    zip: new FormControl(),
    balance: new FormControl(),
    remainingCredit: new FormControl(),
    username: new FormControl(),
  });

  jobInfo = new FormGroup({
    compName: new FormControl(),
    compPhone: new FormControl(),
    salary: new FormControl(),
    field: new FormControl(),
    start: new FormControl(),
  });

  refInfo = new FormGroup({
    fName1: new FormControl(),
    lName1: new FormControl(),
    phone1: new FormControl(),
    fName2: new FormControl(),
    lName2: new FormControl(),
    phone2: new FormControl(),
  });

  loginInfo = new FormGroup({
    uName: new FormControl(),
    psw: new FormControl(),
    confPsw: new FormControl(),
    cBox: new FormControl(),
  });

  isLoading:boolean = false;
  fname:string = '';
  lname:string = '';
  uName:string = '';
  psw:string = '';
  confPsw:string = '';

  submitted = false;

  options: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];

  constructor(private _formBuilder: FormBuilder, private router: Router, private customerService: CustomerService) {}

  ngOnInit() {
    this.basicInfo = this._formBuilder.group({
      fname: ['', [Validators.required, Validators.pattern('[a-zA-Z\- ]*')]],
      lname: ['', [Validators.required, Validators.pattern('[a-zA-Z\- ]*')]],
      ssn: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      bday: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      balance: [0],
      remainingCredit: [1000],
      username: ['']
    });
    this.jobInfo = this._formBuilder.group({
      compName: ['', Validators.required],
      compPhone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      salary: ['', Validators.required],
      field: ['', Validators.required],
      start: ['', Validators.required],
    });
    this.refInfo = this._formBuilder.group({
      fName1: ['', [Validators.required, Validators.pattern('[a-zA-Z\- ]*')]],
      lName1: ['', [Validators.required, Validators.pattern('[a-zA-Z\- ]*')]],
      phone1: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      fName2: ['', [Validators.required, Validators.pattern('[a-zA-Z\- ]*')]],
      lName2: ['', [Validators.required, Validators.pattern('[a-zA-Z\- ]*')]],
      phone2: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });
    this.loginInfo = this._formBuilder.group({
      uName: ['', Validators.required],
      psw: ['', [
        Validators.required,
        Validators.minLength(8)
      ]],
      confPsw: ['', Validators.required],
      cBox: [false, Validators.requiredTrue]
    },
      {
      validators: [CustomValidators.match('psw', 'confPsw')]
      }
    ); 
  }

  // convenience getters for easy access to form fields
  get f(): { [key: string]: AbstractControl } {
    return this.loginInfo.controls;
  }

  get g(): { [key: string]: AbstractControl } {
    return this.basicInfo.controls;
  }

  get h(): { [key: string]: AbstractControl } {
    return this.refInfo.controls;
  }

  get i(): { [key: string]: AbstractControl } {
    return this.jobInfo.controls;
  }

  onSignup() {
    this.submitted = true;

    if (this.loginInfo.valid) {
      this.isLoading = true;

      var poolData = {
       UserPoolId: environment.cognitoUserPoolId, // Your user pool id here
       ClientId: environment.cognitoAppClientId // Your client id here
     }

     var attributeList = [];

     var userPool = new CognitoUserPool(poolData);
     let formData:formDataInterface = {
       "given_name": this.fname,
       "family_name": this.lname,
       "preferred_username": this.uName
     }

    attributeList.push(new CognitoUserAttribute({
      Name: "given_name",
      Value: this.fname
    }));
    attributeList.push(new CognitoUserAttribute({
     Name: "family_name",
     Value: this.lname
   })); 
    attributeList.push(new CognitoUserAttribute({
      Name: "preferred_username",
      Value: this.uName
    }));

     userPool.signUp(this.uName, this.psw, attributeList, [], (
       err,
       result
     ) => {
       this.isLoading = false;
       if (err) {
         alert(err.message || JSON.stringify(err));
         return;
       }

       // Assign username to have a value of this.uName
       this.basicInfo.value.username = this.uName;

       // If user is successfully admitted into user pool, then create
       // customer entry in database
       console.log(this.basicInfo.value);
       this.customerService.addCustomer(this.basicInfo.value).subscribe(
        (response: Customer) => {
          this.customerService.getCustomers();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );

       this.router.navigate(['/signin']);
     });
    }
   else{
     alert("Invalid")
   }
 }

}

