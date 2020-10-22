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
, lapadatok?: LapAdatokObj
//...?
}

export interface AblakStatuszObj
{ url?: string
, cim?: string
, akt?: string
, abl?: string
}   //vagy url és cim van, vagy akt és abl

/* nem jó
export interface KiserletiAblakStatuszObj
{ nulla              : {url: string, cim:string}
, [histindex: number]: {akt: string, abl: string}
}
//*/

export interface AblakObj { [histindex: number]: AblakStatuszObj }

export interface AblakokObj{ [ablakazon: string]: AblakObj }

export interface LapAdatokObj   // LapValaszObj.lapadatok alatt
{ linkek?: any
, kattintanivalok?: any
, ablakok?: AblakokObj[]   //itt (ahogy átjön) tömb, a benne levő AblakokObj-ok csak egy-egy ablakról szólnak
}

export interface LinkAdatokObj   // LapAdatokObj.linkek alatt
{ absHref: string
, ujLapra: boolean
, szoveg: string
}

//lesz itt még talán több is
