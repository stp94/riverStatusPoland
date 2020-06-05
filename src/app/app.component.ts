import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  station = '';
  state = '';
  river = '';

  arrRivers: string [];
  filteredArrRivers: string[] = ['empty'];
  displayedColumns: string[] = ['stacja', 'rzeka', 'stan', 'temp', 'data'];

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
          // @ts-ignore
          if (!this.stationOptions.includes(this.arrRivers[i].stacja)) {
            // @ts-ignore
            this.stationOptions.push(this.arrRivers[i].stacja);
          }
          // @ts-ignore
          if (!this.stateOptions.includes(this.arrRivers[i].województwo)) {
            // @ts-ignore
            this.stateOptions.push(this.arrRivers[i].województwo);
          }
          // @ts-ignore
          if (!this.riverOptions.includes(this.arrRivers[i].rzeka)) {
            // @ts-ignore
            this.riverOptions.push(this.arrRivers[i].rzeka);
          }
        }
        this.stateOptions.sort((a, b) => a.localeCompare(b));
        this.riverOptions.sort((a, b) => a.localeCompare(b));
      }
    );
  }

  searchRiver() {

    this.dataSource = new MatTableDataSource([]);
    this.filteredArrRivers = [];

    this.httpService.get('./assets/json/response.json').subscribe(
      data => {
        this.arrRivers = data as string[];
      }
    );
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.arrRivers.length; i++){
      // @ts-ignore
      if (this.state === this.arrRivers[i].województwo && this.river === this.arrRivers[i].rzeka){
        this.filteredArrRivers.push(this.arrRivers[i]);
      }
    }
    this.dataSource = new MatTableDataSource(this.filteredArrRivers);

    }
  }

