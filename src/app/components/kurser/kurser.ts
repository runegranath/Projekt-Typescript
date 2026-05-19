import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course';
import { MatIconModule } from '@angular/material/icon';
import { Schedule } from '../../services/schedule';

@Component({
  selector: 'app-kurser',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './kurser.html',
  styleUrl: './kurser.scss',
})
export class Kurser implements OnInit {
  // Signaler för data och tillstånd
  courselist = signal<Course[]>([]);
  error = signal<string | null>(null);
  filterText = signal('');
  sortKey = signal<keyof Course>('courseCode');
  sortOrder = signal<'asc' | 'desc'>('asc');
  selectedSubject = signal<string>('');

  subjects = computed(() => {
    const subjects = this.courselist().map((c) => c.subject);
    return [...new Set(subjects)].sort(); // Tar bort dubbletter och sorterar alfabetiskt
  });

  // injicera servicen för att kunna lägga till kurser
  private scheduleService = inject(Schedule);

  // metoden för att lägga till
  addCourse(course: Course) {
    this.scheduleService.addToSchedule(course);
  }

  // Sortering vid rubrikklick
  setSort(key: keyof Course) {
    if (this.sortKey() === key) {
      this.sortOrder.set(this.sortOrder() === 'asc' ? 'desc' : 'asc');
    } else {
      // vid klick på ny kolumn, byt nyckel och nollställ stigande igen
      this.sortKey.set(key);
      this.sortOrder.set('asc');
    }
  }

  // computed signal som reagerar på filterText, sortKey och sortOrder
  filteredCourses = computed(() => {
    const filter = this.filterText().trim().toLocaleLowerCase();
    const key = this.sortKey();
    const order = this.sortOrder();
    const subject = this.selectedSubject();

    let list = this.courselist();

    if (subject) {
      list = list.filter((c) => c.subject === subject);
    }

    list = list.filter(
      (c) =>
        c.courseCode.toLocaleLowerCase().includes(filter) ||
        c.courseName.toLocaleLowerCase().includes(filter) ||
        c.subject.toLocaleLowerCase().includes(filter) ||
        c.progression.toLocaleLowerCase().includes(filter),
    );

    // sortera listan
    return list.sort((a, b) => {
      const valA = a[key].toString();
      const valB = b[key].toString();

      const comparison = valA.localeCompare(valB, 'sv', { numeric: true });

      return order === 'asc' ? comparison : comparison * -1; // Om order asc returnera annars gångra med -1 för att vända
    });
  });

  private courseservice = inject(CourseService);

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.courseservice.getCourses().subscribe({
      next: (response) => {
        this.courselist.set(response);
      },
      error: (err) => {
        console.error(err);
        this.error.set('Något gick fel vid inläsning av kurser. Prova senare.');
      },
    });
  }
}
