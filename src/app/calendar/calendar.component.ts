import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  template:'<ejs-schedule></ejs-schedule>',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
