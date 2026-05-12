import { HttpInterceptorFn, HttpResponse, type HttpEvent } from '@angular/common/http';
import { BusyService } from '../services/busy-service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/internal/operators/finalize';
import { delay, of, tap } from 'rxjs';

const cache = new Map<string, HttpResponse<unknown>>();

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(BusyService);
  const requestKey = `${req.method} ${req.urlWithParams}`;

  const generateCacheKey = (url: string, queryParams: string) => {
    return queryParams ? `${url}?${queryParams}` : url;
  };

  const invalidateCache = (urlPattern: string) => {
    for (const key of Array.from(cache.keys())) {
      if (key.includes(urlPattern)) {
        cache.delete(key);
      }
    }
  };

  const cacheKey = generateCacheKey(req.url, req.params.toString());

  if (req.method !== 'GET') {
    if (req.url.includes('/likes')) {
      invalidateCache('/likes');
      invalidateCache('/members');
    }

    if (req.url.includes('/messages')) {
      invalidateCache('/messages');
    }
  }

  if (req.method === 'GET') {
    const cachedResponse = cache.get(cacheKey);
    if (cachedResponse) {
      return of(cachedResponse.clone() as HttpEvent<unknown>);
    }
  }

  busyService.busy(requestKey);

  return next(req).pipe(
    delay(500), //simulated delay for demo purposes
    tap(response => {
      if (req.method === 'GET' && response instanceof HttpResponse) {
        cache.set(cacheKey, response.clone());
      }
    }),
    finalize(() => busyService.idle(requestKey))
  );

  
};
