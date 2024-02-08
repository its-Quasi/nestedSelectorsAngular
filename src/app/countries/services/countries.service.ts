import { Injectable } from '@angular/core';
import { Country, Region, SmallCountry } from '../interfaces/country';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { combineLatest, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private url = 'https://restcountries.com/v3.1'
  private _regions = [Region.Africa, Region.Americas, Region.Asia, Region.Europe, Region.Oceania]

  constructor(private http: HttpClient) { }

  get regions(): Region[] {
    return [...this._regions]
  }

  getCountriesByRegion(region: string | null): Observable<SmallCountry[]> {
    if (!region) {
      return of([])
    }
    const endpoint = `${this.url}/region/${region}?fields=cca3,name,borders`
    return this.http.get<Country[]>(endpoint).pipe(
      map(countries => this.transformResponse(countries)),
    )
  }

  getCountryByCca3(cca3 : string) : Observable<SmallCountry> {
    const url = `${this.url}/alpha/${cca3}/?fields=name,borders`
    return this.http.get<Country>(url).pipe(
      map(country  => ({
        name:country.name.common,
        cca3:'',
        borders: country.borders || []
      }))
    )
  }

  getCountriesByCca3(borders : string[]) : Observable<SmallCountry[]> {
    if(!borders || borders.length === 0) return of([])
    const requestBorders : Observable<SmallCountry>[] = []
    for (const code of borders) {
      const req = this.getCountryByCca3(code)
      requestBorders.push(req)
    }
    return combineLatest(requestBorders)
  }

  transformResponse(countries: Country[]): SmallCountry[] {
    const response : SmallCountry[] = countries.map(
      country => ({
        name: country.name.common,
        cca3: country.cca3,
        borders: country.borders || []
      })
    )
    return response
  }
}