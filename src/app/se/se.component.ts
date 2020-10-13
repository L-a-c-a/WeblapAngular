import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { KornyService } from '../korny.service'
import { KozosService } from '../kozos.service'
import { SeKozosService } from '../se-kozos.service'
import {DomSanitizer} from '@angular/platform-browser';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { LapValaszObj } from '../feszek';

@Component({
  selector: 'app-se',
  templateUrl: './se.component.html',
  styleUrls: ['./se.component.scss']
})
export class SeComponent implements OnInit 
{
  @Output() kuldeni = new EventEmitter()
  semuv = ""

  imgURL() {return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/${this._seKozos.se['kep']['tip']};${this._seKozos.se['kep']['kodolas']}, ${this._seKozos.se['kep']['tartalom']}`)}

  constructor(private http: HttpClient, private _korny: KornyService, readonly _kozos: KozosService, public _seKozos: SeKozosService, private sanitizer:DomSanitizer) { }

  frissit(mit:string)
  {
    this._kozos.httpHivGET
    ( `lapmuv?azon=${this._seKozos.se.azon ? this._seKozos.se.azon : ""}&frissitendo=${mit}`
    , () =>
      {
        let v:LapValaszObj = this._kozos.httpValasz.body as LapValaszObj
        switch(mit)
        {
          case "html":
            this._seKozos.se ["html"]= v["html"]
            break
          case "kep":
            this._seKozos.se ["kep"]= v["kep"]
            break
          case "linkek":
            this._seKozos.se.lapadatok.linkek = v.lapadatok.linkek
            break
        }
        /** */ console.log(this._seKozos.se)
      }
    )

  }

  nyit(url:string, ujabl: boolean)
  {
    this._kozos.url = url
    this.kuldeni.emit()
  }
  

  ngOnInit(): void {
  }

}
