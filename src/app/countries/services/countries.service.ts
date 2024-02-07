import { Injectable } from '@angular/core';
import { Region } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private _regions = [Region.Africa, Region.Americas, Region.Asia, Region.Europe, Region.Oceania]


  constructor() { }

  get regions() : Region[] {
    return [...this._regions]
  }
}
