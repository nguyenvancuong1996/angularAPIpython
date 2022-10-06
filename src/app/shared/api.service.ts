import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }
  postStudent(data: any) {

    return this.http.post<any>("http://127.0.0.1:5000/student", data)
      .pipe(map((res: any) => {
        res
      }))
  }
  getAllStudent(page: number, search: string) {
    if (search) {
      return this.http.get("http://127.0.0.1:5000/student" + '?q=' + search)
    }else{
      return this.http.get("http://127.0.0.1:5000/student" + '?pages=' + page)
    }
  }

  updateStudent(data: any, id: number) {
    return this.http.put("http://127.0.0.1:5000/update-student/" + id, data)
      .pipe(map((res: any) => {
        res
      }))
  }

  deleteStudent(id: number) {
    return this.http.delete("http://127.0.0.1:5000/delete-student/" + id)
  }
}
