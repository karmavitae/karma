export function  getWorkingDays(start:Date, end:Date): number{
    let s = new Date(start)
    let e = new Date(end)
    let workdays = 0
    while(s.getTime() <= e.getTime()){
      var day = s.getDay()
      if(day>0 && day <6 ){ workdays += 1}
      s.setDate(s.getDate()+1)
    }
    return workdays
  }


  export function getFullTimeHours(start:Date, end: Date): number {
    return getWorkingDays(start, end)*8
  }