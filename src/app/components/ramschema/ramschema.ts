import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Schedule } from '../../services/schedule';

@Component({
  selector: 'app-ramschema',
  imports: [CommonModule],
  templateUrl: './ramschema.html',
  styleUrl: './ramschema.scss',
})
export class Ramschema {
  public scheduleService = inject(Schedule);
  
  // referera lokalt för enklare användning i HTML
  courses = this.scheduleService.schedule;
  totalPoints = this.scheduleService.totalPoints;

  remove(courseCode: string) {
    this.scheduleService.removeFromSchedule(courseCode);
  }
}
