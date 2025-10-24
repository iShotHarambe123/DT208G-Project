import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Course } from '../models/course.interface';

@Injectable({
    providedIn: 'root'
})
export class CourseService {
    private coursesSubject = new BehaviorSubject<Course[]>([]);
    public courses$ = this.coursesSubject.asObservable();

    constructor(private http: HttpClient) {
        this.loadCourses();
    }

    private loadCourses(): void {
        this.http.get<Course[]>('/miun_courses.json').subscribe({
            next: (courses) => {
                this.coursesSubject.next(courses);
            },
            error: (error) => {
                console.error('Error loading courses:', error);
            }
        });
    }

    getCourses(): Observable<Course[]> {
        return this.courses$;
    }

    getUniqueSubjects(): Observable<string[]> {
        return new Observable(observer => {
            this.courses$.subscribe(courses => {
                const subjects = [...new Set(courses.map(course => course.subject))].sort();
                observer.next(subjects);
            });
        });
    }

    filterCourses(searchTerm: string, selectedSubject: string): Observable<Course[]> {
        return new Observable(observer => {
            this.courses$.subscribe(courses => {
                let result = courses;

                if (selectedSubject) {
                    result = result.filter(course => course.subject === selectedSubject);
                }

                if (searchTerm) {
                    const term = searchTerm.toLowerCase();
                    result = result.filter(course =>
                        course.courseCode.toLowerCase().includes(term) ||
                        course.courseName.toLowerCase().includes(term)
                    );
                }

                observer.next(result);
            });
        });
    }

    sortCourses(courses: Course[], sortBy: string): Course[] {
        return [...courses].sort((a, b) => {
            switch (sortBy) {
                case 'courseCode':
                    return a.courseCode.localeCompare(b.courseCode);
                case 'courseName':
                    return a.courseName.localeCompare(b.courseName);
                case 'points':
                    return a.points - b.points;
                case 'subject':
                    return a.subject.localeCompare(b.subject);
                default:
                    return 0;
            }
        });
    }
}