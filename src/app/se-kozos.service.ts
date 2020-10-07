import { Injectable } from '@angular/core';
import { LapValaszObj, AblakStatuszObj, LapAdatokObj } from './feszek'
import { KozosService } from './kozos.service'

@Injectable({
  providedIn: 'root'
})
export class SeKozosService //extends KozosService  nem érdemes, messzire vezető következményei vannak
{
  se:LapValaszObj

  statusz: AblakStatuszObj[] = []     // az ablak históriája: [ { <sorsz>: {url: <url>, cim: <cim>} } ]    vagy { 0: {akt: <sorsz>}}
  histAkt = 1
  histHossz = 1

  statuszFrissit(statusz: AblakStatuszObj[])    // lap/url (kuld) és drmuv/navig után _kozos.se.lapadatok.ablakstatusz alatt, drmuv/ablakstatusz után a httpValasz.body alatt van a státusz
  {
    this.statusz = statusz
    this.histAkt = +this.statusz[0].akt
    if (this.statusz[0].abl) this.aktAblak = this.statusz[0].abl    //van, hogy url-kérés (kuld) során megváltozik az ablak-azon.
      /* */console.log("statusz[0]="+JSON.stringify(this.statusz[0]))
      /* */console.log("Object.keys(this.statusz).length="+Object.keys(this.statusz).length)
      this.histHossz = Object.keys(this.statusz).length - 1
      /* */console.log("státusz frissítve, hist. akt.: " + this.histAkt + ", hist. hossz.: " + this.histHossz)/* */;console.log("statusz:");console.log(this.statusz)
  }

  ablakok = {}
  aktAblak = ""

  ablakokFrissit(ablakok:[])
  {
    this.ablakok = Object.assign({}, ...ablakok)
    const aktAblakObj = ablakok.filter(e=>Object.values(e).toString()!="")[0]   //a tömbből az az egy objektum, aminek az értéke nem ""
    /* */console.log("seKozos.ablakokFrissit: aktAblakObj:"); console.log(aktAblakObj)  // azért a [] formátum is jó valamire, a {} -ból nem egyszerűbb kiválasztani
    this.aktAblak = Object.keys(aktAblakObj)[0]
    this.statuszFrissit(Object.values(aktAblakObj)[0] as AblakStatuszObj[])
  }

  //korrekció, ha az url-kérés (kuld()) közben megváltozott az akt. ablak azon.-ja, vagy nincs is még aktAblak
  ablakokKorr()
  {
    //if (this.aktAblak == "")    ...de nem kell ez ide
    {
      delete this.ablakok[this.aktAblak]
      let lapAdatok: LapAdatokObj = this.se.lapadatok
      this.aktAblak = lapAdatok.ablakstatusz["0"]["abl"]
      this.ablakok[this.aktAblak] = lapAdatok
    }
  }

  constructor(public _kozos: KozosService) { }
}
