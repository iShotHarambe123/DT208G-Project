import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScheduleService } from '../../services/schedule.service';
import { Course } from '../../models/course.interface';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-schedule',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
    schedule$!: Observable<Course[]>;
    totalPoints$!: Observable<number>;

    constructor(private scheduleService: ScheduleService) { }

    ngOnInit(): void {
        this.schedule$ = this.scheduleService.getSchedule();
        this.totalPoints$ = this.scheduleService.getTotalPoints();
    }

    removeCourse(courseCode: string): void {
        if (confirm('Är du säker på att du vill ta bort denna kurs från ditt ramschema?')) {
            this.scheduleService.removeCourseFromSchedule(courseCode);
        }
    }

    clearSchedule(): void {
        if (confirm('Är du säker på att du vill rensa hela ramschemat?')) {
            this.scheduleService.clearSchedule();
        }
    }
}