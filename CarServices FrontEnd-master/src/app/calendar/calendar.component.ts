import {Component, ViewChild, OnInit, ChangeDetectorRef} from "@angular/core";
import {
  DayPilot,
  DayPilotCalendarComponent,
  DayPilotMonthComponent,
  DayPilotNavigatorComponent
} from "@daypilot/daypilot-lite-angular";
import {DataService} from "../_services/data.service";
import {InterventoService} from "../_services/intervento.service";
import {Intervento} from "../models/intervento.model";
import {TokenStorageService} from "../_services/token-storage.service";
import {AutoService} from "../_services/auto.service";

@Component({
  selector: 'calendar-component',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @ViewChild("day") day!: DayPilotCalendarComponent;
  @ViewChild("week") week!: DayPilotCalendarComponent;
  @ViewChild("month") month!: DayPilotMonthComponent;
  @ViewChild("navigator") nav!: DayPilotNavigatorComponent;

  events: DayPilot.EventData[] = [];

  date = DayPilot.Date.today();

  form = [
    {
      name: 'Fornire una breve descrizione del tipo di intervento che si vuole fare',
      id: 'description',
      type: 'text',
    },
    {
      type: 'select',
      id: 'select',
      name: 'Selezionare targa veicolo',
      options: [{ id: 1, name: "United States" }],
    },
  ];
   data = {};

  configNavigator: DayPilot.NavigatorConfig = {
    showMonths: 3,
    cellWidth: 25,
    cellHeight: 25,
    // onVisibleRangeChanged: args => {
    //   this.loadEvents();
    // }
  };

  selectTomorrow() {
    this.date = DayPilot.Date.today().addDays(1);
  }

  changeDate(date: DayPilot.Date): void {
    this.configDay.startDate = date;
    this.configWeek.startDate = date;
    // this.configMonth.startDate = date;
  }

  configDay: DayPilot.CalendarConfig = {
  };

  configWeek: DayPilot.CalendarConfig = {
    viewType: "Week",

    onTimeRangeSelected: async (args) => {
      //const modal = await DayPilot.Modal.prompt("Crea un appuntamento:", "Breve descrizione del tipo di intervento");
      const modal = await DayPilot.Modal.form(this.form, this.data);
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

      if (!modal.result) { return; }
      dp.events.add(new DayPilot.Event({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        text: modal.result
      }));
    }
  };

  constructor(private ds: DataService, private interventoService: InterventoService, private token: TokenStorageService, private changeDetection: ChangeDetectorRef, private autoService:AutoService) {

    this.configWeek.headerDateFormat="dd/MM/yyyy";
    this.configDay.headerDateFormat="dd/MM/yyyy";

    this.configWeek.timeFormat = "Clock24Hours";
    this.configDay.timeFormat = "Clock24Hours";

    this.configWeek.eventMoveHandling = "Disabled";
    this.configDay.eventMoveHandling = "Disabled";

    // this.configWeek.businessBeginsHour = 0;
    // this.configWeek.businessEndsHour =24;


  }

  ngOnInit(): void {
    this.getUserDate();
    this.getUserCar();
  }

  getUserCar():void {
    this.autoService.getAllAuto().subscribe(data=>{
      let optionsAutoList:{id: number; name: string;}[] = [];
      for(let auto of data){
        console.log(auto.targa);
        optionsAutoList.push({id: auto.id, name: auto.targa});
      }
      this.form[1].options = optionsAutoList;
    },err=>{
      console.log(err.message());
    });
  }

  getUserDate():void {
    this.interventoService.getUserDate(this.token.getUser().id.toString()).subscribe(data => {
      let myEvents: DayPilot.EventData[] = [];
      for(let intervento  of data){
        myEvents.push(Object.assign({  start: intervento.startdate,
          end: intervento.enddate,
          id: intervento.dayid,
          text: intervento.datedescription}));
      }
      this.configWeek.events = myEvents;
      //this.configMonth.events = myEvents;
      this.configDay.events = myEvents;
      this.changeDetection.detectChanges();
      this.viewWeek();
    },err => {
      console.log(err.message());
    });
  }

  // ngAfterViewInit(): void {
  //   this.loadEvents();
  // }
  //
  // loadEvents(): void {
  //   const from = this.nav.control.visibleStart();
  //   const to = this.nav.control.visibleEnd();
  //   this.ds.getEvents(from, to).subscribe(result => {
  //     this.events = result;
  //   });
  // }

  viewDay():void {
    this.configNavigator.selectMode = "Day";
    this.configDay.visible = true;
    this.configWeek.visible = false;
    // this.configMonth.visible = false;
  }

  viewWeek():void {
    this.configNavigator.selectMode = "Week";
    this.configDay.visible = false;
    this.configWeek.visible = true;
    // this.configMonth.visible = false;
  }

  viewMonth():void {
    this.configNavigator.selectMode = "Month";
    this.configDay.visible = false;
    this.configWeek.visible = false;
    // this.configMonth.visible = true;
  }
}

