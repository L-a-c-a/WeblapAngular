import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KozosService 
{ // paraméter-átadás helyett (az nehézkes)

  uz1: string
  uz2: string

  //mindenféle weblap
  url: string
  cim: string

  readonly tipusok: string[] = 
  [ "lap"
  ]
  tip: string

  constructor() { }
}
