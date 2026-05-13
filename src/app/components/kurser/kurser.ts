import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course';

@Component({
  selector: 'app-kurser',
  imports: [CommonModule, MatButtonModule],
  templateUrl: './kurser.html',
  styleUrl: './kurser.scss',
})
export class Kurser {
  // Variabel för datan
  courseList: Course[] = [];

  // injicera service
  private courseService = inject(CourseService);

  ngOnInit(): void {
    this.getCourseData();
  }

  getCourseData(): void {
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courseList = data; // länka api-data till variabel
      },
      error: (err) => {
        console.error('Något gick fel:', err);
      },
    });
  }
}
