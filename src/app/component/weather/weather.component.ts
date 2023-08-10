import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Weather } from 'src/app/model/weather';
import { WeatherService } from 'src/app/service/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup;
  city!: string;

  model = new Weather('Singapore', 0, 0, 0, '', 0, 0);
  OPEN_WEATHER_API_KEY = "476e23fe1116f4e69d2a3e68672604e1";
  // subscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private weatherService: WeatherService
  ) {}

  searchWeather() {
    console.log('Search weather');
    this.city = this.formGroup.value['city'];
    console.log(this.city);
    this.weatherService.getWeather(this.city, this.OPEN_WEATHER_API_KEY)
      .then((data) => {
        this.model = new Weather(
          this.city, 
          data.main.temp,
          data.main.pressure,
          data.main.humidity,
          data.weather[0].description,
          data.wind.speed,
          data.wind.deg
        )
      })
      .catch((error) => {
        console.error(error);
      })
  }

  ngOnInit(): void {
    this.formGroup = this.createForm();
  }
  
  ngOnDestroy(): void {}

  private createForm(): FormGroup {
    return this.fb.group({
      city: this.fb.control<string>('', [Validators.required]),
    });
  }

  resetForm() {
    this.formGroup = this.createForm();
  }
}
