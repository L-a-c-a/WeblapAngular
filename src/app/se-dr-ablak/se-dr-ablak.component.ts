import { Component, OnInit, Input } from '@angular/core';
import { KozosService } from '../kozos.service'

@Component({
  selector: 'app-se-dr-ablak',
  templateUrl: './se-dr-ablak.component.html',
  styleUrls: ['./se-dr-ablak.component.scss']
})
export class SeDrAblakComponent implements OnInit 
{
  @Input() abl:object   // {azon: "valami"} , "valami" = "akt" vagy üres
  ablAzon:string  //itt még korai abl-ból inicializálni, nincs értéke - ngOnInit-ben kell
  aktE:boolean    //"akt"-e?

  constructor(public _kozos: KozosService) { }

  ngOnInit(): void 
  {
  this.ablAzon = Object.keys(this.abl)[0]   // az első kulcs az egyből
  this.aktE = this.abl[this.ablAzon]=="akt"
  /** */console.log("abl:")
  /** */console.log(this.abl)
  }

}
