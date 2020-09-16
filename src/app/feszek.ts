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
, egyeb?: any
//...?
}

export interface AblakStatuszObj
{ url?: string
, cim?: string
, akt?: string
}   //vagy url és cim van, vagy akt

//lesz itt még talán több is
