import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Region, SmallCountry } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css']
})
export class SelectorPageComponent implements OnInit {
  constructor(private fb: FormBuilder, private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.onRegionChange()
    this.onCountryChange()
  }

  form = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    borders: ['', Validators.required],
  })


  regions: Region[] = this.countriesService.regions
  countriesByRegion : SmallCountry[] = []
  bordersOfCountry : string[] = []

  onRegionChange() : void {
    this.form.get('region')?.valueChanges
    .pipe(
      tap(() => this.form.get('country')?.setValue('')),
      switchMap(region => this.countriesService.getCountriesByRegion(region))
    )
    .subscribe(countriesByRegion => {
      this.countriesByRegion = countriesByRegion
    })
  }

  onCountryChange() : void {
    this.form.get('country')?.valueChanges
    .subscribe(res => {
      const borders = this.countriesByRegion.find((country) => country.cca3===res)?.borders ?? []

      if(borders.length > 0) {
        this.bordersOfCountry
        console.log(res, this.bordersOfCountry)
      }
    })
  }
}
