import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestCount = signal<number>(0);

  busy(requestKey?: string) {
    this.busyRequestCount.update(current => current + 1);
    const nextCount = this.busyRequestCount();
    console.log(`[Busy +] ${requestKey ?? 'unknown'} -> ${nextCount}`);
    return nextCount;
  }

  idle(requestKey?: string) {
    this.busyRequestCount.update(current => Math.max(0, current - 1));
    const nextCount = this.busyRequestCount();
    console.log(`[Busy -] ${requestKey ?? 'unknown'} -> ${nextCount}`);
    return nextCount;
  }

}
