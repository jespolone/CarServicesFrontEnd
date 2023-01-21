import {DayPilot} from "@daypilot/daypilot-lite-angular";

export interface Intervento{
  id:number;
  startdate: DayPilot.Date;

  enddate: DayPilot.Date;

  datedescription: string;

  dayid: string;

  client: number;

  mechanic: number;

  auto: number;
}
