import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../share/api.service';
import { EmployeeModel } from './employee-dashboard-model';


@Component({
  selector: 'app-employe-dashboard',
  templateUrl: './employe-dashboard.component.html',
  styleUrls: ['./employe-dashboard.component.css']
})
export class EmployeDashboardComponent implements OnInit {
  formValue !: FormGroup;

  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  
  constructor(private formbuilber: FormBuilder,
    private api: ApiService) { }
  
  ngOnInit(): void {
    this.formValue = this.formbuilber.group({
      firstname : [''],
      lastname : [''],
      mobile : [''],
      email : [''],
      salary : ['']

    })
    this.getEmployeData();
  }

  clickAddEmploye(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;

  }
  postEmployeeDetails(){
    this.employeeModelObj.firstname = this.formValue.value.firstname;
    this.employeeModelObj.lastname = this.formValue.value.lastname;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.postEmploye(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Employee Added Successfully");
      let ref = document.getElementById('cancle');
      ref?.click();
      this.formValue.reset();
      this.getEmployeData();
    },
    err=>{
      alert("Something Was Wrong");
    }
    )
    
  }

  getEmployeData(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData = res;
    })
  }

  deleteEmployeeData(row: any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("Are You Sure Delete Data");
      this.getEmployeData();
    })
  }

  onEdit(row: any){
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = row.id;
    this.formValue.controls['firstname'].setValue(row.firstname);
    this.formValue.controls['lastname'].setValue(row.lastname);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
  }

  updateEmployeeDetails(){

    this.employeeModelObj.firstname = this.formValue.value.firstname;
    this.employeeModelObj.lastname = this.formValue.value.lastname;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res=>{
      alert("Data Update Successfully");
      let ref = document.getElementById('cancle');
      ref?.click();
      this.formValue.reset();
      this.getEmployeData();
    })

  }

}
