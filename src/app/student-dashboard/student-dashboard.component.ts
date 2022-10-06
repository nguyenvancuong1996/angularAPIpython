import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { StudentModel } from '../student-dashboard.model';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {

  fromValue !: FormGroup;
  studentModelObj: StudentModel = new StudentModel();
  studentData !: any;
  p: number = 1;
  total: number = 0
  showAdd !: boolean
  showUpdate !: boolean
  search !: string
  constructor(private frombuilber: FormBuilder, private api: ApiService) { }
  
  ngOnInit(): void {
    this.fromValue = this.frombuilber.group({
      name: [''],
      address: [''],
      brithday: [''],
      phone: ['']
    })
    this.getAllStudents();
  }
  postStudentDetails() {
    this.studentModelObj.name = this.fromValue.value.name;
    this.studentModelObj.address = this.fromValue.value.address;
    this.studentModelObj.birthday = this.fromValue.value.birthday;
    this.studentModelObj.phone = this.fromValue.value.phone;
    console.log(this.studentModelObj);

    this.api.postStudent(this.studentModelObj).subscribe(res => {
      alert('add success')
      let ref = document.getElementById('cancel')
      ref?.click();
      this.fromValue.reset();
      this.getAllStudents();
    },
      error => {
        alert('add fail')
      }
    )
  }
  // clickme(){
  //   console.log(this.search, "vo day");
  // }
  getAllStudents() {
    this.api.getAllStudent(this.p, this.search).subscribe((res: any) => {
      this.studentData = res.pagination.results;
      this.total = res.pagination.count;
    })
  }

  pageChangeEvent(event: number) {
    this.p = event;
    this.getAllStudents();
  }

  deleteStudent(id: number) {
    console.log(id);
    this.api.deleteStudent(id).subscribe(res => {
      alert('delete student success !!!')
      this.getAllStudents();
    });
  }

  clickAddStudent() {
    this.fromValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  onEdit(data: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.studentModelObj.id = data.id
    this.fromValue.controls['name'].setValue(data.name)
    this.fromValue.controls['address'].setValue(data.address)
    this.fromValue.controls['birthday'].setValue(data.birthday)
    this.fromValue.controls['phone'].setValue(data.phone)
    console.log("vo day br", data.birthday);

    this.fromValue.reset()
  }

  updateStudent() {
    console.log(this.fromValue.value.birthday, "br");
    this.studentModelObj.name = this.fromValue.value.name;
    this.studentModelObj.address = this.fromValue.value.address;
    this.studentModelObj.birthday = this.fromValue.value.birthday;
    this.studentModelObj.phone = this.fromValue.value.phone;
    this.api.updateStudent(this.studentModelObj, this.studentModelObj.id)
      .subscribe(res => {
        alert('update success')
        let ref = document.getElementById('cancel')
        ref?.click();
        this.fromValue.reset();
        this.getAllStudents();
      },
        error => {
          alert('update fail')
        }
      )
  }

}
