import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScheduleService } from '../../services/schedule.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-navigation',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
    scheduleCount$: Observable<number>;

    constructor(private scheduleService: ScheduleService) {
        this.scheduleCount$ = new Observable(observer => {
            this.scheduleService.getSchedule().subscribe(courses => {
                observer.next(courses.length);
            });
        });
    }
}