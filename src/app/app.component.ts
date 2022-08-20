import { FormGroup, FormControl } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Task_FE_Technopolitan';
  header: { key: string, value: any, dataType?: any }[] = [
    { "key": "Full Name", "value": "name" },
    { "key": "Faculty", "value": "faculty" },
    { "key": "Birth Of Date", "value": "BOD", "dataType": "Date" }
  ];

  persons = [
    {
      "name": 'heba',
      "faculty": 'Computer Science IS',
      "BOD": new Date(),
    },
    {
      "name": 'amira',
      "faculty": 'Computer Science CS',
      "BOD": new Date(),
    }
  ];

  formData: { label: string ,value:string,type:string}[] = [
    { "label": "First Name" ,"value":"fname","type":"text" },
    { "label": "Last Name","value":"lname" ,"type":"text" },
    { "label": "Contact Number","value":"contactNumber" ,"type":"number"},
    { "label": "Email","value":"email","type":"email" },
  ]
  address: boolean = false;

  Form: FormGroup=new FormGroup({});


  SetSetting(formData: any[], address?: boolean) {
    formData = this.formData;
    address = true;
    let form: any={};
    if (address) {
      formData.push({ "label": "Address","value":"address" });
    }
    for (let i = 0; i < formData.length; i++) {
      form[formData[i].value] = new FormControl('');
    }

    this.Form = new FormGroup(form);
    console.log(this.Form)
  }
  OnSubmit(){
    console.log(this.Form)
  }
  ngOnInit(): void {

    this.SetSetting(this.formData,this.address);
  }
}
