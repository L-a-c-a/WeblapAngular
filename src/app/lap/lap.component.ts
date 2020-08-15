import { Component, OnInit } from '@angular/core';
import { KozosService } from '../kozos.service'

@Component({
  selector: 'app-lap',
  templateUrl: './lap.component.html',
  styleUrls: ['./lap.component.scss']
})
export class LapComponent implements OnInit 
{
  constructor(public _kozos: KozosService) { }  //se a private, se a protected, se a semmi nem jó, csak a public, ha a html-ben használni akarom
    //OKOSKODÁS! Ilyenkor csinál automatikusan egy _kozos tagot, de csak ha ott a public vagy readonly - https://www.typescriptlang.org/docs/handbook/classes.html#parameter-properties

  ngOnInit(): void {  }

}
