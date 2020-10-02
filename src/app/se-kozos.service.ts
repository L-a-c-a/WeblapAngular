import { Injectable } from '@angular/core';
import { LapValaszObj, AblakStatuszObj } from './feszek'
import { KozosService } from './kozos.service'

@Injectable({
  providedIn: 'root'
})
export class SeKozosService 
{
  se:LapValaszObj

  statusz: AblakStatuszObj[] = []     // az ablak históriája: [ { <sorsz>: {url: <url>, cim: <cim>} } ]    vagy { 0: {akt: <sorsz>}}
  histAkt = 1
  histHossz = 1

  statuszFrissit(statusz: AblakStatuszObj[])    // lap/url (kuld) és drmuv/navig után _kozos.se.egyeb alatt, drmuv/ablakstatusz után a httpValasz.body alatt van a státusz
  {
    this.statusz = statusz
    this.histAkt = +this.statusz[0].akt //as unknown as number
    if (this.statusz[0].abl) this.aktAblak = this.statusz[0].abl    //van, hogy url-kérés (kuld) során megváltozik az ablak-azon.
      /* */console.log("statusz[0]="+JSON.stringify(this.statusz[0]))
      /* */console.log("Object.keys(this.statusz).length="+Object.keys(this.statusz).length)
      this.histHossz = Object.keys(this.statusz).length - 1
      /* */console.log("státusz frissítve, hist. akt.: " + this.histAkt + ", hist. hossz.: " + this.histHossz)/* */;console.log("statusz:");console.log(this.statusz)
  }

  ablakok = [] // egy eleme egy egykulcsú objektum; a kulcs egy ablak-azon., az érték vagy "", vagy egy ablakstátusz (ha ez az akt. ablak)
  aktAblak = ""

  ablakokFrissit(ablakok:[])
  {
    this.ablakok = ablakok
    const aktAblakObj = ablakok.filter(e=>Object.values(e).toString()!="")[0]   //a tömbből az az egy objektum, aminek az értéke nem ""
    /* */console.log("seKozos.ablakokFrissit: aktAblakObj:"); console.log(aktAblakObj)
    this.aktAblak = Object.keys(aktAblakObj)[0]
    this.statuszFrissit(Object.values(aktAblakObj)[0] as AblakStatuszObj[])
    //this.statuszFrissit(ablakok[this.aktAblak])  hülyeség
  }

  constructor(public _kozos: KozosService) { }
}
