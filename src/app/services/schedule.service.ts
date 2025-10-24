import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from '../models/course.interface';

@Injectable({
    providedIn: 'root'
})
export class ScheduleService {
    private readonly STORAGE_KEY = 'university-schedule';
    private scheduleSubject = new BehaviorSubject<Course[]>([]);
    public schedule$ = this.scheduleSubject.asObservable();

    constructor() {
        this.loadScheduleFromStorage();
    }

    private loadScheduleFromStorage(): void {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (stored) {
                const schedule = JSON.parse(stored);
                this.scheduleSubject.next(schedule);
            }
        } catch (error) {
            console.error('Error loading schedule from localStorage:', error);
        }
    }

    private saveScheduleToStorage(schedule: Course[]): void {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(schedule));
        } catch (error) {
            console.error('Error saving schedule to localStorage:', error);
        }
    }

    addCourseToSchedule(course: Course): boolean {
        const currentSchedule = this.scheduleSubject.value;

        // Kolla om kursen redan finns
        if (currentSchedule.some(c => c.courseCode === course.courseCode)) {
            return false;
        }

        const updatedSchedule = [...currentSchedule, course];
        this.scheduleSubject.next(updatedSchedule);
        this.saveScheduleToStorage(updatedSchedule);
        return true;
    }

    removeCourseFromSchedule(courseCode: string): void {
        const currentSchedule = this.scheduleSubject.value;
        const updatedSchedule = currentSchedule.filter(c => c.courseCode !== courseCode);
        this.scheduleSubject.next(updatedSchedule);
        this.saveScheduleToStorage(updatedSchedule);
    }

    getSchedule(): Observable<Course[]> {
        return this.schedule$;
    }

    getTotalPoints(): Observable<number> {
        return new Observable(observer => {
            this.schedule$.subscribe(courses => {
                const total = courses.reduce((sum, course) => sum + course.points, 0);
                observer.next(total);
            });
        });
    }

    isCourseInSchedule(courseCode: string): Observable<boolean> {
        return new Observable(observer => {
            this.schedule$.subscribe(courses => {
                const isInSchedule = courses.some(c => c.courseCode === courseCode);
                observer.next(isInSchedule);
            });
        });
    }

    clearSchedule(): void {
        this.scheduleSubject.next([]);
        this.saveScheduleToStorage([]);
    }
}