import { HttpInterceptorFn, type HttpEvent } from '@angular/common/http';
import { BusyService } from '../services/busy-service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/internal/operators/finalize';
import { delay, of, tap } from 'rxjs';

const cache = new Map<string, HttpEvent<unknown>>();

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  const busyService = inject(BusyService);

  if(req.method === 'GET') {
    const cachedResponse = cache.get(req.url);
    if (cachedResponse) {
      return of(cachedResponse);
    }
  }

  busyService.busy();

  return next(req).pipe(
    delay(500), //simulated delay for demo purposes
    tap(response => {
      if (req.method === 'GET') {
        cache.set(req.url, response);
      }
    }),
    finalize(() => busyService.idle())
  );

  
};
