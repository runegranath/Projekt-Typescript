import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course';


@Injectable({
  providedIn: 'root',
})
export class CourseService {

  private http = inject(HttpClient);

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('miun_courses.json')
  }
}
