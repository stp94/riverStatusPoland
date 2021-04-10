import {Component, NgModule, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import { EChartsOption } from 'echarts';
import {MatTab} from '@angular/material/tabs';
import { observable, computed } from 'mobx-angular';
import {MatToolbar} from '@angular/material/toolbar';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// @NgModule({
//   imports: [MobxAngularModule]
// })
export class AppComponent implements OnInit{

  station = '';
  state = '';
  river = '';


  arrRivers: string [];
  filteredArrRivers: string[] = ['rzeka'];
  displayedColumns: string[] = ['stacja', 'rzeka', 'stan', 'temp', 'data'];

  stationOptions: string[] = [];
  stateOptions: string[] = [];
  riverOptions: string[] = [];
  riverFilteredOptions: string[] = [];
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
    this.subscribeApi();
    console.log(this.subscribeApi());

  }
  fillOptions(){
    this.riverOptions = [];
    this.httpService.get('https://danepubliczne.imgw.pl/api/data/hydro/',{
      headers: {
        'Content-Type': 'application/json',
      }
    }).subscribe(
      data => {
        this.arrRivers = data as string [];
        // tslint:disable-next-line:prefer-for-of
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
          if (!this.riverOptions.includes(this.arrRivers[i].rzeka) && this.arrRivers[i].województwo === this.state) {
            console.log(this.state);
            // @ts-ignore
            this.riverOptions.push(this.arrRivers[i].rzeka);
          }
        }
        this.stateOptions.sort((a, b) => a.localeCompare(b));
        this.riverOptions.sort((a, b) => a.localeCompare(b));
      }
    );
  }
  subscribeApi(): string[]{
    let returnData: string[];
    this.httpService.get('./assets/json/response.json').subscribe(
      data => {
        returnData = data as string[];
        console.log(data as string[]);
      }
    );
    return returnData;
  }
  searchRiver() {
    this.dataSource = new MatTableDataSource([]);
    this.filteredArrRivers = [];
    this.httpService.get('https://danepubliczne.imgw.pl/api/data/hydro/', {
      headers: {
        'Content-Type': 'application/json',
      },
    }).subscribe(
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
    console.log();
    }
  }


