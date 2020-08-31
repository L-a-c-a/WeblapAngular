import { Component, OnInit } from '@angular/core';

// ROSSZ LETT A NEVE, mert nemcsak konf-ra használom. Új komponens: kuld - megvan, most már csak egy kicsit rossz a neve

@Component({
  selector: 'app-konf',
  templateUrl: './konf.component.html',
  styleUrls: ['./konf.component.scss']
})
export class KonfComponent implements OnInit 
{
  muv: string = "lap"

  constructor() { }

  ngOnInit(): void {
  }

}
