import { Component, OnInit, Input } from '@angular/core';
import { KornyService } from '../korny.service'
import { KozosService } from '../kozos.service'
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { LapValaszObj } from '../feszek'

@Component({
  selector: 'app-kuld',
  templateUrl: './kuld.component.html',
  styleUrls: ['./kuld.component.scss', '../app.component.scss']  // ../app -ban vannak a közös stílusok
})
export class KuldComponent implements OnInit 
{
  @Input() muv: string
  azon = ""

  //httpValasz: HttpResponse<Object> = new HttpResponse<Object>()
  //hibauz: HttpErrorResponse = new HttpErrorResponse({})
  //valaszStringified() { return JSON.stringify(this.httpValasz.body, undefined, 2) }
  //hibauzStringified() { return JSON.stringify(this.hibauz, undefined, 2) }
  valaszStringified() { return JSON.stringify(this._kozos.httpValasz.body, undefined, 2) }
  hibauzStringified() { return JSON.stringify(this._kozos.hibauz, undefined, 2) }

  kuld(): void 
  {
    this._kozos.httpValasz = new HttpResponse<Object>()
    this._kozos.hibauz = new HttpErrorResponse({})
    this.http.get
    ( `${this._korny.backendURL}${this.muv}?url=${this._kozos.url ? this._kozos.url : ""}&tip=${this._kozos.tip ? this._kozos.tip : ""}`
    , {observe: "response"}
    ).subscribe
    ( data =>
      { console.log({ kiir: "én", muv: this.muv, tart: data })  //hiba esetén ki sem íródik
        this._kozos.httpValasz = data
        //let v = this._kozos.httpValasz.body
        //let va = v["a"] ? v["a"] : v   //megszívattam magam a többféle case class-'al
        //this._kozos.se = { html: va["html"], kep: va["kep"] }
        this._kozos.se = this._kozos.httpValasz.body as LapValaszObj
        this.azon = this._kozos.se["azon"]
        this._kozos.kuldKeszErtesit(this.azon)
        /** */ console.log(this._kozos.se)
      }
    , err =>
      { console.log({ uz: "hiba van!", tart: err })
        this._kozos.hibauz = err
      }
    , () => console.log({ kiir: "én", tart: "kuld lement" })
    )

  }

  constructor(private http: HttpClient, private _korny: KornyService, public _kozos: KozosService) { }

  ngOnInit(): void { this.kuld() }

}
