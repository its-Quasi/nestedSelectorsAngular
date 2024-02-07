import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Region } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css']
})
export class SelectorPageComponent {
  constructor(private fb : FormBuilder, private countriesService : CountriesService) {}

  form = this.fb.group({
    region  : ['', Validators.required ],
    country : ['', Validators.required ],
    borders : ['', Validators.required ],
  })

  regions : Region[] = this.countriesService.regions
  
  
}
