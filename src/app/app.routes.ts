import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { ScheduleComponent } from './components/schedule/schedule.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'courses', component: CourseListComponent },
    { path: 'schedule', component: ScheduleComponent },
    { path: '**', redirectTo: '' }
];