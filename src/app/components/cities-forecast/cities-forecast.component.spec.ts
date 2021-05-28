import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesForecastComponent } from './cities-forecast.component';
import { WeatherDataService } from 'src/app/services/weather-data.service';
import { HelperService } from 'src/shared/services/helper.service';

import {FETCH_CITIES} from '../../mocks/forecast.mock';
import { ActivatedRoute, Router } from '@angular/router';
import { TestModule } from 'src/app/test/test.module';
import { LoginLoaderService } from 'src/shared/services/login-loader.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormatTimePipe } from 'src/shared/pipes/format-time.pipe';
import { RouterTestingModule } from '@angular/router/testing';

describe('CitiesForecastComponent', () => {
  let component: CitiesForecastComponent;
  let fixture: ComponentFixture<CitiesForecastComponent>;
  let dataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CitiesForecastComponent, FormatTimePipe],
      imports: [
        TestModule,
        RouterTestingModule
      ],
      providers: [
        WeatherDataService,
        HelperService,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitiesForecastComponent);
    component = fixture.componentInstance;
    dataService = TestBed.get(WeatherDataService);
    fixture.detectChanges();

  });

  afterEach(() => {
    component = null;
    dataService = null;
  });

  it('----------------Should create-----------------', () => {
    expect(component).toBeTruthy();
  });

  it('Get all 5 cities data', () => {
    spyOn(dataService, "getCityDataByName").and.returnValue(FETCH_CITIES);
    expect(dataService.getCityDataByName().length).toBe(5);

  });

  it('Get time from timestamp', () => {
    expect(component.getFormattedTime(1622087614))
      .toBe('3:53:34');
  });

});
