import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeUTCService {

  constructor() { }

  convertTimeToUTC(time: Date) {
    time.setTime(time.getTime() - time.getTimezoneOffset()*60*1000);
    return time;
  }
}
