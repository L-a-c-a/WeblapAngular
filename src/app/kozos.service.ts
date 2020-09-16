import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { LapValaszObj } from './feszek'
import { KornyService } from './korny.service'
import { Subject, BehaviorSubject } from "rxjs";

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

  se:LapValaszObj

  httpValasz: HttpResponse<Object> = new HttpResponse<Object>()
  hibauz: HttpErrorResponse = new HttpErrorResponse({})
  //valaszStringified() { return JSON.stringify(this.httpValasz.body, undefined, 2) }
  //hibauzStringified() { return JSON.stringify(this.hibauz, undefined, 2) }

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
    , () => console.log({ kiir: "én", tart: "_kozos.httpHivGET lement" })
    )

  }

/*** ÚJ DOLOG */
  private _kuldKesz = new BehaviorSubject<string>("semmi");  //ha csak Subject, előszörre nem küldődik el
  kuldKesz$ = this._kuldKesz.asObservable()
  kuldKeszErtesit(s:string) { this._kuldKesz.next(s)}

  constructor(private http: HttpClient, private _korny: KornyService) { }
}
