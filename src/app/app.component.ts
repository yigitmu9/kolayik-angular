import { Component } from '@angular/core';
import{DayService,WeekService,WorkWeekService,MonthService,AgendaService,MonthAgendaService,TimelineViewsService,TimelineMonthService} from '@syncfusion/ej2-angular-schedule';

interface SideNavToggle{
  screenWidth: number;
  collapsed:boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
    providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService]

})
export class AppComponent {
  title = 'demo2';

  isSideNavCollapsed=false;
  screenWidth=0;

  onToggleSidenav(data: SideNavToggle): void {
    this.screenWidth=data.screenWidth;
    this.isSideNavCollapsed=data.collapsed;

  }
}
