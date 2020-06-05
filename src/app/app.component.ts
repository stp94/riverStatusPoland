import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  stacja: string;
  województwo: string;
  rzeka: string;
  stan_wody: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Twoja rzeka';
  station = '';
  state = '';
  river = '';

  arrRivers: string [];
  filteredArrRivers: string[] = ['empty'];
  displayedColumns: string[] = ['stacja', 'rzeka', 'stan'];

  stationOptions: string[] = [];
  stateOptions: string[] = [];
  riverOptions: string[] = [];
  dataSource: MatTableDataSource<string>;

  constructor(private httpService: HttpClient) { }

  inputStation(station: string) {
    this.station = station;
  }
  inputState(state: any) {
    this.state = state;
  }
  inputRiver(river: any) {
    this.river = river;
  }
  ngOnInit(){
    this.fillOptions();


  }

  fillOptions(){
    this.httpService.get('./assets/json/response.json').subscribe(
      data => {
        this.arrRivers = data as string [];
        for (let i = 0; i < this.arrRivers.length; i++) {
          if (!this.stationOptions.includes(this.arrRivers[i].stacja)) {
            this.stationOptions.push(this.arrRivers[i].stacja as string);
          }
          if (!this.stateOptions.includes(this.arrRivers[i].województwo)) {
            this.stateOptions.push(this.arrRivers[i].województwo as string);
          }
          if (!this.riverOptions.includes(this.arrRivers[i].rzeka)) {
            this.riverOptions.push(this.arrRivers[i].rzeka as string);
          }
        }
      }
    );
  }

  searchRiver() {
    this.httpService.get('./assets/json/response.json').subscribe(
      data => {
        this.arrRivers = data as string[];
      }
    );

    for (let i = 0; i < this.arrRivers.length; i++){
      // @ts-ignore
      if (this.state === this.arrRivers[i].województwo){
        this.filteredArrRivers.push(this.arrRivers[i]);
      }
    }
    this.dataSource = new MatTableDataSource(this.filteredArrRivers);

    }
  }

