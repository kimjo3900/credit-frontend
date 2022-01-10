import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  NgForm
} from '@angular/forms';
import { CognitoUserPool,CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

interface formDataInterface {
  "given_name": string;
  "family_name": string;
  "preferred_username": string;
  "birthdate": string;
  "custom:ssn": string;
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
    fName: new FormControl(),
    lName: new FormControl(),
    ssn: new FormControl(),
    bday: new FormControl(),
    addr: new FormControl(),
    city: new FormControl(),
    state: new FormControl(),
    zip: new FormControl(),
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
  });

  // Need to edit this later so that username and password take user-given values
  isLoading:boolean = false;
  fName:string = '';
  lName:string = '';
  uName:string = '';
  bday:string = '';
  ssn:string = '';
  psw:string = '';
  confPsw:string = '';

  // For testing purposes
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

  constructor(private _formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.basicInfo = this._formBuilder.group({
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      ssn: ['', Validators.required],
      bday: ['', Validators.required],
      addr: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
    });
    this.jobInfo = this._formBuilder.group({
      compName: ['', Validators.required],
      compPhone: ['', Validators.required],
      salary: ['', Validators.required],
      field: ['', Validators.required],
      start: ['', Validators.required],
    });
    this.refInfo = this._formBuilder.group({
      fName1: ['', Validators.required],
      lName1: ['', Validators.required],
      phone1: ['', Validators.required],
      fName2: ['', Validators.required],
      lName2: ['', Validators.required],
      phone2: ['', Validators.required],
    });
    this.loginInfo = this._formBuilder.group({
      uName: ['', Validators.required],
      psw: ['', Validators.required],
      confPsw: ['', Validators.required],
    });
  }

  onSignup(form: NgForm){
    this.submitted = true;
    
    if (form.valid) {
      this.isLoading = true;
      var poolData = {
       UserPoolId: environment.cognitoUserPoolId, // Your user pool id here
       ClientId: environment.cognitoAppClientId // Your client id here
     };

     var userPool = new CognitoUserPool(poolData);
     
     var attributeList = [];
     
     let formData:formDataInterface = {
       "given_name": this.fName,
       "family_name": this.lName,
       "preferred_username": this.uName,
       "birthdate": this.bday,
       "custom:ssn": this.ssn
     }

     for (let key  in formData) {
       let attrData = {
         Name: key,
         Value: formData[key]
       }
       console.log(attrData)
       let attribute = new CognitoUserAttribute(attrData);
       attributeList.push(attribute)
     }
     console.log(attributeList)
     userPool.signUp(this.uName, this.psw, attributeList, [], (
       err,
       result
     ) => {
       this.isLoading = false;
       if (err) {
         alert(err.message || JSON.stringify(err));
         return;
       }
       this.router.navigate(['/signin']);
     });
    }
   else{
     alert("Invalid")
   }
 }

}
