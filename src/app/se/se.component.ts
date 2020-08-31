import { Component, OnInit, Input } from '@angular/core';
import { KornyService } from '../korny.service'
import { KozosService } from '../kozos.service'
import {DomSanitizer} from '@angular/platform-browser';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-se',
  templateUrl: './se.component.html',
  styleUrls: ['./se.component.scss']
})
export class SeComponent implements OnInit 
{
  @Input() azon: string
  semuv = ""

  //jsonstringify(p) { return JSON.stringify(p)}
  imgURL() {return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/${this._kozos.se['kep']['tip']};${this._kozos.se['kep']['kodolas']}, ${this._kozos.se['kep']['tartalom']}`)}
  constructor(private http: HttpClient, private _korny: KornyService, readonly _kozos: KozosService, private sanitizer:DomSanitizer) { }

  frissit(mit:string) 
  {
    this._kozos.httpValasz = new HttpResponse<Object>()
    this._kozos.hibauz = new HttpErrorResponse({})
    this.http.get
    ( `${this._korny.backendURL}lapmuv?azon=${this.azon ? this.azon : ""}&frissitendo=${mit}`
    , {observe: "response"}
    ).subscribe
    ( data =>
      { console.log({ kiir: "én", azon: this.azon, tart: data })  //hiba esetén ki sem íródik
        this._kozos.httpValasz = data
        let v = this._kozos.httpValasz.body
        switch(mit)
        {
          case "html":
            this._kozos.se ["html"]= v["html"]
            break
          case "kep":
            this._kozos.se ["kep"]= v["kep"]
            break
        }
        
        /** */ console.log(this._kozos.se)
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
