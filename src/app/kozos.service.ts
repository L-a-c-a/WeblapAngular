import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { KornyService } from './korny.service'

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

  httpValasz: HttpResponse<Object> = new HttpResponse<Object>()
  hibauz: HttpErrorResponse = new HttpErrorResponse({})

  stringified(o:object) { return JSON.stringify(o, undefined, 2) }

  httpHivGET (relURL:string, utana:()=>void = ()=>{})
  {
    this.httpValasz = new HttpResponse<Object>()
    this.hibauz = new HttpErrorResponse({})
    this.http.get(this._korny.backendURL+relURL, {observe: "response"})
    .subscribe
    ( data =>
      { console.log({ kiir: "én", url: this._korny.backendURL+relURL, tart: data })  //hiba esetén ide el se jut
        this.httpValasz = data  //kuld komponensben megjelenik
        utana()
      }
    , err =>
      { console.log({ uz: "hiba van!", tart: err })
        this.hibauz = err  //kuld komponensben megjelenik
      }
    , () => console.log({ kiir: "én", tart: `_kozos.httpHivGET(${relURL}) lement` })
    )

  }

  constructor(private http: HttpClient, private _korny: KornyService) { }
}
