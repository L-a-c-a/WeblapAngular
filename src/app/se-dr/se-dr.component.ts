import { Component, OnInit } from '@angular/core';
import { KornyService } from '../korny.service'
import { KozosService } from '../kozos.service'
import { SeKozosService } from '../se-kozos.service'
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AblakStatuszObj } from '../feszek';

@Component({
  selector: 'app-se-dr',
  templateUrl: './se-dr.component.html',
  styleUrls: ['./se-dr.component.scss']
})
export class SeDRComponent implements OnInit 
{
  kepesNyitva = false
  //kepesNyitvaJelzo = "v"
  kepesNyitvaJelzoFn() { return this.kepesNyitva ? ">" : "v"}

  valasz = {}

  kepessegek = {}  //RemoteWebDriver.getCapabilities

  //ablakok = []    ld. seKözös

  kepes(e: boolean) 
  { //** */    console.log("érték="+e)
    if (e)
    {
      this.drMuv("kepes", ()=>{this.kepessegek = this.valasz["capabilities"]})
      //** */    console.log("válasz="+this._kozos.stringified(this.valasz))
      
    }
  }

  ablak() { this.drMuv("ablak", ()=>{this._seKozos.ablakokFrissit(this.valasz as [])}) }

  ujAblak()  { this.drMuv("ujablak", ()=>{this._seKozos.ablakokFrissit(this.valasz as [])}) }
  /*
  { this.drMuv("ujablak"
              , ()=>{
                      this._seKozos.ablakok = this.valasz as []
                      let historia =  Object.values(this._seKozos.ablakok.filter(e=>Object.values(e).toString()!="")[0])[0] as AblakStatuszObj[]
                      /* * /console.log(historia)
                      this._seKozos.statuszFrissit(historia)
                    }
              ) 
  }
  */

  valt(ablAzon: string)
  {
    this._kozos.httpHivGET
    ( "drmuv?muv=ablakvalt&abl="+ablAzon
    , () => {
              //this._seKozos.ablakok = this._kozos.httpValasz.body as []
              ///* */console.log("valt: ablAzon="+ablAzon)
              ///* */console.log(this._seKozos.ablakok)
              ////this._seKozos.statuszFrissit(this.ablakok[ablAzon])  //nem jó, mert tömb, és nem az azon az indexe, hanem 0,1,2... de kicseszünk vele:
              ////let historia = this.ablakok.filter(e=>ablAzon in e)[0][ablAzon]
              //// vagy így:
              //let historia = Object.assign({}, ...this._seKozos.ablakok)[ablAzon]
              ///* */console.log(historia)
              //this._seKozos.statuszFrissit(historia)
              this._seKozos.ablakokFrissit(this._kozos.httpValasz.body as [])
            }
    )
  }

  drMuv(muv:string, utana:()=>void = ()=>{})
  {
    //  műveletek RemoteWebDriver-en
    //this._kozos.httpValasz = new HttpResponse<Object>()
    //this._kozos.hibauz = new HttpErrorResponse({})
    this.http.get
    ( `${this._korny.backendURL}drmuv?muv=${muv}&tip=${this._kozos.tip ? this._kozos.tip : ""}`
    , {observe: "response"}
    ).subscribe
    ( data =>
      { console.log({ kiir: "én", muv: muv, tart: data })  //hiba esetén ki sem íródik
        this.valasz = data.body
        if (this.valasz[this._kozos.tip] == "csukva")   //ezt muv=csuk -ra válaszolja // lehet, hogy ide switch fog kelleni
        {
          this._kozos.tip = "lap"  // se komponens tűnjön el
          this._seKozos.se.altip = ""   // se-dr komponens tűnjön el
          this._kozos.httpValasz = data  //megjeleníti a kuld (a se-dr helyett)
        }
        utana()
      }
    , err =>
      { console.log({ uz: "hiba van!", tart: err })
        this._kozos.hibauz = err
      }
    , () => console.log({ kiir: "én", tart: "drmuv lement" })
    )
  }

  constructor(private http: HttpClient, private _korny: KornyService, public _kozos: KozosService, public _seKozos: SeKozosService) { }

  ngOnInit(): void { this.ablak() }

}
