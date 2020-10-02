import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { KozosService } from '../kozos.service'
import { SeKozosService } from '../se-kozos.service'
import { LapValaszObj, AblakStatuszObj } from '../feszek'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-se-dr-ablak',
  templateUrl: './se-dr-ablak.component.html',
  styleUrls: ['./se-dr-ablak.component.scss']
})
export class SeDrAblakComponent implements OnInit 
{
  @Input() abl:object   // {azon: valami} , valami = akármi vagy üres (""), a nemüres jelzi, hogy aktuális, és még infót is hordozhat
  ablAzon:string  //itt még korai abl-ból inicializálni, nincs értéke - ngOnInit-ben kell
  aktE:boolean    // akkor aktuális, ha nemüres az érték
  //@Input("aktablak") aktAblak:string  //hátha ennek változását észreveszi és frissül  --- nem jött be, ugyanúgy nem frissül, mint _seKozos.aktAblak -tól
  @Output() valtani = new EventEmitter()
  //ablakok = []

  //statusz: AblakStatuszObj[] = []     // { <sorsz>: {url: <url>, cim: <cim>} }     vagy { 0: {akt: <sorsz>}} . de az nem sokáig
  //histAkt: number = 1
  //histHossz = 1

  ablakStatusz()
  {
    this._kozos.httpHivGET
    ( "drmuv?muv=ablakstatusz&abl="+this.ablAzon
    , () => {
              //this.statusz = this._kozos.httpValasz.body as AblakStatuszObj[]
              ///* */;console.log("statusz:");console.log(this.statusz)
              //this.histAkt = +this.statusz[0].akt
              //delete this.statusz[0]
              ///* */console.log("hist. akt.: " + this.histAkt)/* */;console.log("statusz:");console.log(this.statusz)  //MŰX
              this._seKozos.statuszFrissit(this._kozos.httpValasz.body as AblakStatuszObj[])
            }
    )
  }

  navig(delta:number)
  {
    this._kozos.httpHivGET
    ( "drmuv?muv=navig&abl="+this.ablAzon+"&delta="+delta
    , () => {
              ////this.histAkt = this._kozos.httpValasz.body["histSorsz"]
              ////this.histHossz = this._kozos.httpValasz.body["histHossz"]
              ////this._kozos.se = this._kozos.httpValasz.body["lap"]
              //this._seKozos.se = this._kozos.httpValasz.body as LapValaszObj
              //this.histAkt = this._seKozos.se.egyeb["histSorsz"]
              //this.histHossz = this._seKozos.se.egyeb["histHossz"]   // más lett .egyeb formátuma: AblakStatuszObj[]
              this._seKozos.se = this._kozos.httpValasz.body as LapValaszObj
              this._seKozos.statuszFrissit(this._seKozos.se.egyeb)
              /* */console.log("navig-ban még akt="+this._seKozos.se.egyeb[0].akt)
            }
      )
  }

  //feliratkozas: Subscription

  constructor(public _kozos: KozosService, public _seKozos: SeKozosService) { }

  ngOnInit(): void 
  {
    this.ablAzon = Object.keys(this.abl)[0]   // az első kulcs az egyből
    //this.aktE = !!this.abl[this.ablAzon]    //=="akt" helyett !!  - innentől bármi lehet az érték, pl. a história
    this.aktE = this.ablAzon == this._seKozos.aktAblak
    /** */console.log("abl:")
    /** */console.log(this.abl)
    //setTimeout(()=>{this.ablakStatusz()})   //így nincs ExpressionChangedAfterItHasBeenCheckedError ***ÚJ DOLOG***
    //setTimeout(this.ablakStatusz)    // így nem műx: this._kozos is undefined (42. (ez) és 21. sor)
    /*
    this.feliratkozas =
      this._kozos.kuldKesz$.subscribe(s => { /** /console.log(`kuldKesz$ küldte: ${s} és se-dr-ablak észrevette`)
                                             setTimeout
                                             ( ()=>
                                              {
                                                this.ablakStatusz()
                                                this.navig(0)
                                              }
                                             )
                                           }
                                     )
    */
  }
  
  //ngOnDestroy() { this.feliratkozas.unsubscribe }

}
