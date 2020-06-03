import {Component, ViewChild} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Twoja rzeka';
  station = '';
  state = '';
  river = '';

  arrRivers: string [];

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


  searchRiver() {
    console.log(this.station, this.river, this.state);

    this.httpService.get('./assets/json/response.json').subscribe(
      data => {
        this.arrRivers = data as string [];
        //console.log(this.arrRivers[1].stacja);
      }
    );
    // for (let i = 0; i < this.arrRivers.length; i++){
    //   if (this.station === this.arrRivers[i].stacja){
    //     console.log(this.arrRivers[i]);
    //   }
    // }


    for (let i = 0; i < this.arrRivers.length; i++){
      if (this.state === this.arrRivers[i].województwo){
        console.log(this.arrRivers[i]);
      }
    }




  }
}
