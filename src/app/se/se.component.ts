import { Component, OnInit } from '@angular/core';
import { KornyService } from '../korny.service'
import { KozosService } from '../kozos.service'
import { SeKozosService } from '../se-kozos.service'
import {DomSanitizer} from '@angular/platform-browser';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-se',
  templateUrl: './se.component.html',
  styleUrls: ['./se.component.scss']
})
export class SeComponent implements OnInit 
{
  semuv = ""

  imgURL() {return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/${this._seKozos.se['kep']['tip']};${this._seKozos.se['kep']['kodolas']}, ${this._seKozos.se['kep']['tartalom']}`)}

  constructor(private http: HttpClient, private _korny: KornyService, readonly _kozos: KozosService, public _seKozos: SeKozosService, private sanitizer:DomSanitizer) { }

  frissit(mit:string) 
  {
    this._kozos.httpValasz = new HttpResponse<Object>()
    this._kozos.hibauz = new HttpErrorResponse({})
    this.http.get
    ( `${this._korny.backendURL}lapmuv?azon=${this._seKozos.se.azon ? this._seKozos.se.azon : ""}&frissitendo=${mit}`
    , {observe: "response"}
    ).subscribe
    ( data =>
      { console.log({ kiir: "én", azon: this._seKozos.se.azon, tart: data })  //hiba esetén ki sem íródik
        this._kozos.httpValasz = data
        let v = this._kozos.httpValasz.body
        switch(mit)
        {
          case "html":
            this._seKozos.se ["html"]= v["html"]
            break
          case "kep":
            this._seKozos.se ["kep"]= v["kep"]
            break
        }
        
        /** */ console.log(this._seKozos.se)
      }
    , err =>
      { console.log({ uz: "hiba van!", tart: err })
        this._kozos.hibauz = err
      }
    , () => console.log({ kiir: "én", tart: `se ${mit} frissítés lement` })
    )

  }

  ngOnInit(): void {
  }

}
