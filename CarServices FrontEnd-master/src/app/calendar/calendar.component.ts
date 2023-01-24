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
import {UserService} from "../_services/user.service";
import {ToasterService, toastPayload} from "../_services/toaster.service";
import {IndividualConfig} from "ngx-toastr";

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

  showCalendar: boolean = true;

  showTab:boolean = false;

  form = [
    {
      name: 'Fornire una breve descrizione del tipo di intervento che si vuole fare',
      id: 'description',
      type: 'text',
    },
    {
      type: 'select',
      id: 'auto',
      name: 'Selezionare targa veicolo',
      options: [{ id: 1, name: "placeholder" }],
    },
    {
      type: 'select',
      id: 'meccanico',
      name: 'Selezionare preferenza meccanico',
      options: [{ id: 1, name: "placeholder" }],
    },
  ];
   data = {};
   toast!: toastPayload;

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
    viewType: "Day",

    onTimeRangeSelected: async (args) => {
      const dp = args.control;

      if(args.end.getTime() - args.start.getTime() != 1800000){
        this.toast = {
          message: "Puoi allocare al massimo 30 minuti per intervento",
          title: "Errore",
          type: 'error',
          ic: {
            timeOut: 2500,
            closeButton: true,
            positionClass: 'toast-top-center',
          } as IndividualConfig,
        };
        this.toasterService.showToast(this.toast);
        dp.clearSelection();
        return;
      }

      const modal = await DayPilot.Modal.form(this.form, this.data);
      if(modal.canceled){
        dp.clearSelection();
        return;
      }
      if(modal.result.description == "" || modal.result.meccanico  == null || modal.result.auto == null){
        this.toast = {
          message: "Per favore valorizzare tutti i campi",
          title: "Errore",
          type: 'error',
          ic: {
            timeOut: 2500,
            closeButton: true,
            positionClass: 'toast-top-center',
          } as IndividualConfig,
        };
        this.toasterService.showToast(this.toast);
        dp.clearSelection();
        return;
      }

      dp.clearSelection();

      let interventoToSave: Intervento = Object.assign({});
      interventoToSave.datedescription = modal.result.description;
      interventoToSave.startdate =  args.start;
      interventoToSave.enddate = args.end;
      interventoToSave.dayid = DayPilot.guid();
      interventoToSave.mechanic =  modal.result.meccanico;
      interventoToSave.client = this.token.getUser().id;
      interventoToSave.auto = modal.result.auto;

      this.interventoService.createDate(interventoToSave).subscribe(
        data => {
          console.log(data);
        });

      if (!modal.result) { return; }
      dp.events.add(new DayPilot.Event({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        text: modal.result.description
      }));
    }
  };

  configWeek: DayPilot.CalendarConfig = {
    viewType: "Week",

    onTimeRangeSelected: async (args) => {
      console.log(args.resource);
      console.log(args);
      const dp = args.control;
      if(args.end.getTime() - args.start.getTime() != 1800000){
        this.toast = {
          message: "Puoi allocare al massimo 30 minuti per intervento",
          title: "Errore",
          type: 'error',
          ic: {
            timeOut: 2500,
            closeButton: true,
            positionClass: 'toast-top-center',
          } as IndividualConfig,
        };
        this.toasterService.showToast(this.toast);
        dp.clearSelection();
        return;
      }
      const modal = await DayPilot.Modal.form(this.form, this.data);

      if(modal.canceled){
        dp.clearSelection();
        return;
      }
      if(modal.result.description == "" || modal.result.meccanico  == null || modal.result.auto == null){
        this.toast = {
          message: "Per favore valorizzare tutti i campi",
          title: "Errore",
          type: 'error',
          ic: {
            timeOut: 2500,
            closeButton: true,
            positionClass: 'toast-top-center',
          } as IndividualConfig,
        };
        this.toasterService.showToast(this.toast);
        dp.clearSelection();
        return;
      }
      dp.clearSelection();

      let interventoToSave: Intervento = Object.assign({});
      interventoToSave.datedescription = modal.result.description;
      interventoToSave.startdate =  args.start;
      interventoToSave.enddate = args.end;
      interventoToSave.dayid = DayPilot.guid();
      interventoToSave.mechanic =  modal.result.meccanico;
      interventoToSave.client = this.token.getUser().id;
      interventoToSave.auto = modal.result.auto;

      this.interventoService.createDate(interventoToSave).subscribe(
        data => {
          console.log(data);
        });

      if (!modal.result) { return; }
      dp.events.add(new DayPilot.Event({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        text: modal.result.description
      }));
    }
  };

  constructor(private ds: DataService, private interventoService: InterventoService, private token: TokenStorageService, private changeDetection: ChangeDetectorRef, private autoService:AutoService, private userService : UserService, private toasterService: ToasterService) {

    this.configWeek.headerDateFormat="dd/MM/yyyy";
    this.configDay.headerDateFormat="dd/MM/yyyy";

    this.configWeek.timeFormat = "Clock24Hours";
    this.configDay.timeFormat = "Clock24Hours";

    this.configWeek.eventMoveHandling = "Disabled";
    this.configDay.eventMoveHandling = "Disabled";

    this.configWeek.eventResizeHandling = "Disabled";
    this.configDay.eventResizeHandling = "Disabled";
    // this.configWeek.businessBeginsHour = 0;
    // this.configWeek.businessEndsHour =24;


  }

  ngOnInit(): void {
    this.getUserDate();
    this.getUserCar();
    this.getAllMechanical();
    console.log(this.token.getUser().idRuolo);
    this.token.getUser().idRuolo == 2 ? this.showTab = true : this.showTab = false;

    console.log(this.showTab);
  }

  getUserCar():void {
    this.autoService.getAllAuto().subscribe(data=>{
      let optionsAutoList:{id: number; name: string;}[] = [];
      for(let auto of data){
        optionsAutoList.push({id: auto.id, name: auto.targa});
      }
      this.form[1].options = optionsAutoList;
    },err=>{
      console.log(err.message);
    });
  }

  getAllMechanical() : void{
    this.userService.getAllMechanical().subscribe( data=>{
      let optionsMechanicalList:{id: number; name: string;}[] = [];
      for(let mech of data){
        optionsMechanicalList.push({id: mech.id, name: mech.nome + " " + mech.cognome});
      }
      this.form[2].options = optionsMechanicalList;
    },err=>{
      console.log(err.message);
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
      console.log(err.message);
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

  switchMode() : void{
    console.log(this.showCalendar);
    if(!this.showCalendar){
      this.configNavigator.selectMode == 'Day' ? this.configDay.visible = true : this.configWeek.visible = true;
    }else {
      this.configDay.visible = false;
      this.configWeek.visible = false;
    }
    this.showCalendar = !this.showCalendar;
  }
}

