import { Injectable } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

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
  , "se"  //Selenium
  ]
  tip: string

  se = {}//{ "html":"", "kep":{"tip": "", "kodolas": "", "tartalom": ""} }

  httpValasz: HttpResponse<Object> = new HttpResponse<Object>()
  hibauz: HttpErrorResponse = new HttpErrorResponse({})
  //valaszStringified() { return JSON.stringify(this.httpValasz.body, undefined, 2) }
  //hibauzStringified() { return JSON.stringify(this.hibauz, undefined, 2) }

  constructor() { }
}
