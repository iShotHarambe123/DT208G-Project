import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { ScheduleService } from '../../services/schedule.service';
import { Observable, map } from 'rxjs';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    totalCourses$!: Observable<number>;
    totalSubjects$!: Observable<number>;
    scheduleCount$!: Observable<number>;
    totalSchedulePoints$!: Observable<number>;

    constructor(
        private courseService: CourseService,
        private scheduleService: ScheduleService
    ) { }

    ngOnInit(): void {
        this.totalCourses$ = this.courseService.getCourses().pipe(
            map(courses => courses.length)
        );

        this.totalSubjects$ = this.courseService.getUniqueSubjects().pipe(
            map(subjects => subjects.length)
        );

        this.scheduleCount$ = this.scheduleService.getSchedule().pipe(
            map(courses => courses.length)
        );

        this.totalSchedulePoints$ = this.scheduleService.getTotalPoints();
    }
}