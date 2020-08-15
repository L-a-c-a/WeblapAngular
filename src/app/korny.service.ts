import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KornyService 
{
  //readonly backendURL: string = "/back/"
  backendURL: string = "http://localhost:8090/"  //de helyretenni!

  constructor() { }
}
