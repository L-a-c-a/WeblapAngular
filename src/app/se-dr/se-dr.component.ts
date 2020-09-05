import { Component, OnInit } from '@angular/core';
import { KornyService } from '../korny.service'
import { KozosService } from '../kozos.service'
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

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

  kepes(e: boolean) 
  { /** */    console.log("érték="+e)
    if (e)
    {
      //this._kozos.httpValasz = new HttpResponse<Object>()
      //this._kozos.hibauz = new HttpErrorResponse({})
      this.http.get
      ( `${this._korny.backendURL}drmuv?muv=kepes&tip=${this._kozos.tip ? this._kozos.tip : ""}`
      , {observe: "response"}
      ).subscribe
      ( data =>
        { console.log({ kiir: "én", muv: "részl", tart: data })  //hiba esetén ki sem íródik
          //this._kozos.httpValasz = data  //megjeleníti a kuld
          this.valasz = data.body
          this.kepessegek = this.valasz["capabilities"]
        }
      , err =>
        { console.log({ uz: "hiba van!", tart: err })
          this._kozos.hibauz = err
        }
      , () => console.log({ kiir: "én", tart: "drmuv lement" })
      )
  
    }
  }

  drMuv(muv:string)
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
          this._kozos.se.altip = ""   // se-dr komponens tűnjön el
          this._kozos.httpValasz = data  //megjeleníti a kuld (a se-dr helyett)
        }
      }
    , err =>
      { console.log({ uz: "hiba van!", tart: err })
        this._kozos.hibauz = err
      }
    , () => console.log({ kiir: "én", tart: "drmuv lement" })
    )
  }

  constructor(private http: HttpClient, private _korny: KornyService, public _kozos: KozosService) { }

  ngOnInit(): void {
  }

}
