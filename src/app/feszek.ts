// interFÉSZEK

export interface LapValaszObj 
{ azon: string
, url: string
, cim: string
, html: string
, kep:
  { tip: string  //png, jpg, ...
  , kodolas: string  // base64, ...
  , tartalom: string
  }
, tip: string
, altip: string
, lapadatok?: any
//...?
}

export interface AblakStatuszObj
{ url?: string
, cim?: string
, akt?: string
, abl?: string
}   //vagy url és cim van, vagy akt és abl

export interface LapAdatokObj   // LapValaszObj.lapadatok alatt
{ linkek?: any
, kattintanivalok?: any
, ablakstatusz?: AblakStatuszObj[]
}
//lesz itt még talán több is
