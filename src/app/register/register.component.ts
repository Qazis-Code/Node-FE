import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Employee } from '../Model/employee';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  _id!: string;
  name: string = '';
  address: string = '';
  phone: string = '';
  employeeData: Employee[] = [];
  isEditable!: boolean;
  postURL = 'http://localhost:8086/employee/create';
  getURL = 'http://localhost:8086/employee/getAll';
  deleteURL = 'http://localhost:8086/employee/delete';
  updateURL = 'http://localhost:8086/employee/update';

  constructor(private http: HttpClient) {
    this.getAllEmployees();
  }

  register() {
    let request = {
      name: this.name,
      address: this.address,
      phone: this.phone,
    };

    this.http
      .post(this.postURL, request, { responseType: 'text' })
      .subscribe((response: any) => {
        this.getAllEmployees();
        console.log(response);
        alert('Employee Created!');
      });
  }

  getAllEmployees() {
    this.http.get(this.getURL).subscribe((response: any) => {
      console.log(response.data);
      this.employeeData = response.data;
      console.log(this.employeeData);
      console.log('Employee Fetched!');
    });
  }

  onDelete(index: string){
    const request = { _id: index };
    this.http
      .delete(this.deleteURL, {body: request})
      .subscribe((response: any) => {
        this.getAllEmployees();
        console.log(response);
        alert('Employee Deleted!');
      });
  }

  onUpdate(id: string, nameInput: string, addressInput: string, phoneInput: string){
    const request = { _id: id, name: nameInput, address: addressInput, phone: phoneInput };
    this.http
      .put(this.updateURL, request)
      .subscribe((response: any) => {
        this.getAllEmployees();
        console.log(response);
        alert('Employee Updated!');
      });
  }

  onEdit(){
    this.isEditable = !this.isEditable;
  }
}