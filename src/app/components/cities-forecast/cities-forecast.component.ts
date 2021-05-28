import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherDataService } from 'src/app/services/weather-data.service';
import { HttpErrorResponse } from '@angular/common/http';

import { forkJoin, Subscription } from 'rxjs';
import { HelperService } from 'src/shared/services/helper.service';
import { LoginLoaderService } from 'src/shared/services/login-loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cities-forecast',
  templateUrl: './cities-forecast.component.html',
  styleUrls: ['./cities-forecast.component.less']
})
export class CitiesForecastComponent implements OnInit, OnDestroy {

  allCitiesData: any = [];

  selectedCity: any = null;

  getAllCitiesDataSubscription: Subscription;

  constructor(
    private router: Router,
    private dataService: WeatherDataService,
    private helper: HelperService,
    private loader: LoginLoaderService
  ) { }

  ngOnInit(): void {
    this.getAllCitiesData();
  }

  /** This is the getAllCitiesData function
* @param 
* @returns
*/
  getAllCitiesData() {
    this.loader.show();

    // Fork join to make parallel calls
    // It is good to use forkjoin when we have master kind of data to fetch from server
    this.getAllCitiesDataSubscription = forkJoin([
      this.dataService.getCityDataByName('London'),
      this.dataService.getCityDataByName('Barcelona'),
      this.dataService.getCityDataByName('Florence'),
      this.dataService.getCityDataByName('Prague'),
      this.dataService.getCityDataByName('Paris')
    ]).subscribe((weatherData: any[]) => {

      this.loader.hide();

      if (weatherData) {
        this.allCitiesData = weatherData;
      }

    },
      (error: HttpErrorResponse) => {
        this.loader.hide();

        console.log(error);
      })
  }

  /** This is the getFormattedTime function
* @param 
* @returns 
**/
  getFormattedTime(timestamp) {
    return this.helper.getTimeFromTimestamp(timestamp);
  }

  /** This is the ngOnDestroy function
* @param 
* @returns 
**/
  ngOnDestroy() {
    // Avoid memory leaks
    this.getAllCitiesDataSubscription.unsubscribe();
  }

  /** This is the trackById function
* @param  index number
* @param  el any
* @returns number
**/
  trackById(index: number, el: any): number {
    return el.id;
  }

  /** This is the selectCity function
* @param city any
* @returns 
**/
  selectCity(city: any): void {
    this.selectedCity = city;
    
    this.router.navigate([`/cities/${city.name}`]);
  }

}
