import { Component, OnInit, Input } from '@angular/core';
import { KornyService } from '../korny.service'
import { KozosService } from '../kozos.service'
import { SeKozosService } from '../se-kozos.service'
import { HttpClient } from '@angular/common/http';
import { LapValaszObj, LapAdatokObj } from '../feszek'

@Component({
  selector: 'app-kuld',
  templateUrl: './kuld.component.html',
  styleUrls: ['./kuld.component.scss', '../app.component.scss']  // ../app -ban vannak a közös stílusok
})
export class KuldComponent implements OnInit 
{
  @Input() muv: string

  kuld(ujablak: boolean = false): void 
  {
    this._kozos.httpHivGET
    ( `${this.muv}?url=${this._kozos.url ? this._kozos.url : ""}&tip=${this._kozos.tip ? this._kozos.tip : ""}${ujablak ? "&ujablak=true" : ""}`
    , () =>
      {
        if (this._kozos.tip=='se')
        {
          this._seKozos.se = this._kozos.httpValasz.body as LapValaszObj
          /** */ console.log(this._seKozos.se)
          //this._seKozos.ablakokKorr()
          //let lapAdatok: LapAdatokObj = this._seKozos.se.lapadatok
          //this._seKozos.statuszFrissit(lapAdatok.ablakstatusz)
          this._seKozos.ablakokFrissit(this._seKozos.se.lapadatok.ablakok)
        }
      }
    )
  }

  constructor(private http: HttpClient, private _korny: KornyService, public _kozos: KozosService, public _seKozos: SeKozosService) { }

  ngOnInit(): void { this.kuld() }

}
