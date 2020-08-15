import { Component, OnInit } from '@angular/core';
import { KornyService } from '../korny.service'
import { KozosService } from '../kozos.service'
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

// ROSSZ LETT A NEVE, mert nemcsak konf-ra használom. Új komponens: kuld.

@Component({
  selector: 'app-konf',
  templateUrl: './konf.component.html',
  styleUrls: ['./konf.component.scss', '../app.component.scss']  // ../app -ban vannak a közös stílusok
})
export class KonfComponent implements OnInit 
{
  muv: string

  httpValasz: HttpResponse<Object> = new HttpResponse<Object>()
  hibauz: HttpErrorResponse = new HttpErrorResponse({})
  valaszStringified() { return JSON.stringify(this.httpValasz.body, undefined, 2) }
  hibauzStringified() { return JSON.stringify(this.hibauz, undefined, 2) }

  kuld(): void 
  {
    this.httpValasz = new HttpResponse<Object>()
    this.hibauz = new HttpErrorResponse({})
    this.http.get
    ( `${this._korny.backendURL}${this.muv}?url=${this._kozos.url ? this._kozos.url : ""}&tip=${this._kozos.tip ? this._kozos.tip : ""}`
    , {observe: "response"}
    ).subscribe
    ( data =>
      { console.log({ kiir: "én", muv: this.muv, tart: data })  //hiba esetén ki sem íródik
        this.httpValasz = data
      }
    , err =>
      { console.log({ uz: "hiba van!", tart: err })
        this.hibauz = err
      }
    , () => console.log({ kiir: "én", tart: "konf lement" })
    )

  }

  constructor(private http: HttpClient, private _korny: KornyService, private _kozos: KozosService) { }

  ngOnInit(): void {
  }

}
