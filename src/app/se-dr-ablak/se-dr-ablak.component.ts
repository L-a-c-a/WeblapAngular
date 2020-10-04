import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { KozosService } from '../kozos.service'
import { SeKozosService } from '../se-kozos.service'
import { LapValaszObj, AblakStatuszObj } from '../feszek'

@Component({
  selector: 'app-se-dr-ablak',
  templateUrl: './se-dr-ablak.component.html',
  styleUrls: ['./se-dr-ablak.component.scss']
})
export class SeDrAblakComponent implements OnInit 
{
  @Input("abl") ablAzon:string
  aktE:boolean
  @Output() valtani = new EventEmitter()

  ablakStatusz()
  {
    this._kozos.httpHivGET
    ( "drmuv?muv=ablakstatusz&abl="+this.ablAzon
    , () => {
              this._seKozos.statuszFrissit(this._kozos.httpValasz.body as AblakStatuszObj[])
            }
    )
  }

  navig(delta:number)
  {
    this._kozos.httpHivGET
    ( "drmuv?muv=navig&abl="+this.ablAzon+"&delta="+delta
    , () => {
              this._seKozos.se = this._kozos.httpValasz.body as LapValaszObj
              this._seKozos.statuszFrissit(this._seKozos.se.egyeb)
              /* */console.log("navig-ban még akt="+this._seKozos.se.egyeb[0].akt)
            }
      )
  }

  constructor(public _kozos: KozosService, public _seKozos: SeKozosService) { }

  ngOnInit(): void 
  {
    this.aktE = this.ablAzon == this._seKozos.aktAblak
  }
  
}
