import { computed, inject, Injectable, signal } from '@angular/core';
import { Course } from '../models/course';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class Schedule {
  // signal som håller valda kurser
  private selectedCourses = signal<Course[]>([]);

  // gör en global version
  schedule = this.selectedCourses;

  // injicera snackbar för att visa meddelanden
  private snackBar = inject(MatSnackBar);

  totalPoints = computed(() =>
    this.selectedCourses().reduce((sum, course) => sum + course.points, 0),
  );

  // ladda localStorages sparade schema vid start
  constructor() {
    const saved = localStorage.getItem('schedule');
    if (saved) {
      this.selectedCourses.set(JSON.parse(saved)); // tolka webbläsarens strängdata till json
    }
  }

  // lägg till kurser
  addToSchedule(course: Course) {
    // dublettkoll
    if (!this.selectedCourses().some((c) => c.courseCode === course.courseCode)) {
      // kolla om någon ny kurs har samma kurskod för en existerande
      this.selectedCourses.update((prev) => [...prev, course]); // uppdatera signalen om det inte fanns dubletter och gör en ny lista med spread operator
      this.saveToStorage();

      // Snackbar-meddelande i 3 sekunder i mitten och botten av skärmen
      this.snackBar.open(`Kursen "${course.courseName}" har lagts till!`, 'Stäng', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    } else {
      this.snackBar.open(`Kursen ${course.courseCode} finns redan i schemat!`, 'OK', {
        duration: 4000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
  }

  // metod för borttagning
  removeFromSchedule(courseCode: string) {
    this.selectedCourses.update(
      (
        prev, // basera uppdateringen på förra listan
      ) => prev.filter((c) => c.courseCode !== courseCode), // utgå från unika korskoden och gör en ny lista där alla kurser finns utom den vi tar bort
    );
    this.saveToStorage();

    this.snackBar.open(`Kursen är borttagen`, undefined, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  // spara i i localstorage från json till strängformat
  private saveToStorage() {
    localStorage.setItem('schedule', JSON.stringify(this.selectedCourses()));
  }
}
