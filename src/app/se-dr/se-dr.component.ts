import { Component, OnInit } from '@angular/core';
import { KornyService } from '../korny.service'
import { KozosService } from '../kozos.service'
import { SeKozosService } from '../se-kozos.service'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-se-dr',
  templateUrl: './se-dr.component.html',
  styleUrls: ['./se-dr.component.scss']
})
export class SeDRComponent implements OnInit 
{
  kepesNyitva = false
  kepesNyitvaJelzoFn() { return this.kepesNyitva ? ">" : "v"}

  kepessegek = {}  //RemoteWebDriver.getCapabilities

  //ablakok = []    ld. seKözös

  kepes(e: boolean) 
  { //** */    console.log("érték="+e)
    if (e)
      this._kozos.httpHivGET("drmuv?muv=kepes", ()=>{this.kepessegek = this._kozos.httpValasz.body["capabilities"]})
  }

  ablak() { this._kozos.httpHivGET("drmuv?muv=ablak", ()=>{this._seKozos.ablakokFrissit(this._kozos.httpValasz.body as [])}) }

  ujAblak()  { this._kozos.httpHivGET("drmuv?muv=ujablak", ()=>{this._seKozos.ablakokFrissit(this._kozos.httpValasz.body as [])}) }

  valt(ablAzon: string)
  {
    this._kozos.httpHivGET
    ( "drmuv?muv=ablakvalt&abl="+ablAzon
    , () => {
              this._seKozos.ablakokFrissit(this._kozos.httpValasz.body as [])
            }
    )
  }

  csuk()
  {
    this._kozos.httpHivGET
    ( "drmuv?muv=csuk"
    , () => {
              this._seKozos.ablakok = {}
              this._seKozos.aktAblak = ""
              this._kozos.tip = "lap"  // se komponens tűnjön el
              this._seKozos.se.altip = ""   // se-dr komponens tűnjön el
            }
    )
  }

  constructor(private http: HttpClient, private _korny: KornyService, public _kozos: KozosService, public _seKozos: SeKozosService) { }

  ngOnInit(): void { /*this.ablak()*/ }

}
