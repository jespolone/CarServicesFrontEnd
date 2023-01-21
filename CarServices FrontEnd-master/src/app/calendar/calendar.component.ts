import {Component, ViewChild, AfterViewInit} from "@angular/core";
import {
  DayPilot,
  DayPilotCalendarComponent,
  DayPilotMonthComponent,
  DayPilotNavigatorComponent
} from "@daypilot/daypilot-lite-angular";
import {DataService} from "../_services/data.service";
import {InterventoService} from "../_services/intervento.service";
import {Intervento} from "../models/intervento.model";
import {Auto} from "../models/auto.model";
import {TokenStorageService} from "../_services/token-storage.service";

@Component({
  selector: 'calendar-component',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements AfterViewInit {

  @ViewChild("day") day!: DayPilotCalendarComponent;
  @ViewChild("week") week!: DayPilotCalendarComponent;
  @ViewChild("month") month!: DayPilotMonthComponent;
  @ViewChild("navigator") nav!: DayPilotNavigatorComponent;

  events: DayPilot.EventData[] = [];

  date = DayPilot.Date.today();

  configNavigator: DayPilot.NavigatorConfig = {
    showMonths: 3,
    cellWidth: 25,
    cellHeight: 25,
    onVisibleRangeChanged: args => {
      this.loadEvents();
    }
  };

  selectTomorrow() {
    this.date = DayPilot.Date.today().addDays(1);
  }

  changeDate(date: DayPilot.Date): void {
    this.configDay.startDate = date;
    this.configWeek.startDate = date;
    this.configMonth.startDate = date;
  }

  configDay: DayPilot.CalendarConfig = {
  };

  configWeek: DayPilot.CalendarConfig = {
    viewType: "Week",

    onTimeRangeSelected: async (args) => {
      const modal = await DayPilot.Modal.prompt("Crea un appuntamento:", "Breve descrizione del tipo di intervento");
      const dp = args.control;
      dp.clearSelection();

      //test save date

     // this.authService.login(username, password).subscribe(
      let interventoToSave: Intervento = Object.assign({});
   // private auto!:Auto;
      interventoToSave.datedescription = modal.result;
      interventoToSave.startdate =  args.start;
      interventoToSave.enddate = args.end;
      interventoToSave.dayid = DayPilot.guid();
      interventoToSave.mechanic = 29;
      interventoToSave.client = this.token.getUser().id;
      interventoToSave.auto = 18; //implementa getAuto user

      this.interventoService.createDate(interventoToSave).subscribe(
        data => {
          console.log(data);
        });

      console.log(typeof modal.result);
      console.log(typeof args.start);
      console.log(typeof args.end);
      console.log(typeof DayPilot.guid());
      if (!modal.result) { return; }
      dp.events.add(new DayPilot.Event({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        text: modal.result
      }));
    }
  };

  configMonth: DayPilot.MonthConfig = {

  };

  constructor(private ds: DataService, private interventoService: InterventoService, private token: TokenStorageService) {
    this.viewWeek();
    //this.configWeek.headerDateFormat="dddd MMMM d, yyyy";
    this.configWeek.eventMoveHandling="Disabled";
  //  this.configWeek.eve
  }

  ngAfterViewInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    const from = this.nav.control.visibleStart();
    const to = this.nav.control.visibleEnd();
    this.ds.getEvents(from, to).subscribe(result => {
      this.events = result;
    });
  }

  viewDay():void {
    this.configNavigator.selectMode = "Day";
    this.configDay.visible = true;
    this.configWeek.visible = false;
    this.configMonth.visible = false;
  }

  viewWeek():void {
    this.configNavigator.selectMode = "Week";
    this.configDay.visible = false;
    this.configWeek.visible = true;
    this.configMonth.visible = false;
  }

  viewMonth():void {
    this.configNavigator.selectMode = "Month";
    this.configDay.visible = false;
    this.configWeek.visible = false;
    this.configMonth.visible = true;
  }


}

