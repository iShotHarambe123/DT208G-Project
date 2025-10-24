import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { ScheduleService } from '../../services/schedule.service';
import { Course } from '../../models/course.interface';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-course-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './course-list.component.html',
    styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
    courses$!: Observable<Course[]>;
    subjects$!: Observable<string[]>;
    filteredCourses: Course[] = [];

    searchTerm = '';
    selectedSubject = '';
    sortBy = 'courseCode';

    constructor(
        private courseService: CourseService,
        private scheduleService: ScheduleService
    ) { }

    ngOnInit(): void {
        this.courses$ = this.courseService.getCourses();
        this.subjects$ = this.courseService.getUniqueSubjects();

        this.updateFilteredCourses();
    }

    updateFilteredCourses(): void {
        this.courseService.filterCourses(this.searchTerm, this.selectedSubject)
            .subscribe(courses => {
                this.filteredCourses = this.courseService.sortCourses(courses, this.sortBy);
            });
    }

    onSearchChange(): void {
        this.updateFilteredCourses();
    }

    onSubjectChange(): void {
        this.updateFilteredCourses();
    }

    onSortChange(): void {
        this.updateFilteredCourses();
    }

    addToSchedule(course: Course): void {
        const success = this.scheduleService.addCourseToSchedule(course);
        if (!success) {
            alert('Kursen finns redan i ditt ramschema!');

        }
    }

    isCourseInSchedule(courseCode: string): Observable<boolean> {
        return this.scheduleService.isCourseInSchedule(courseCode);
    }
}