import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError, BehaviorSubject, from } from 'rxjs';
import { catchError, switchMap, tap, filter, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

let isRefreshing = false;
let refreshSubject = new BehaviorSubject<any>(null);

export const authInterceptorFn: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const addToken = (request: HttpRequest<unknown>, token: string) =>
    request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });

  const handle401Error = (
    request: HttpRequest<unknown>,
    next: HttpHandlerFn
  ) => {
    if (!authService.getToken()) {
      authService.logout();
      router.navigate(['/login']);
      return throwError(() => 'No token');
    }

    if (!isRefreshing) {
      isRefreshing = true;
      refreshSubject = new BehaviorSubject<any>(null);

      return from(authService.refreshToken()).pipe(
        switchMap(() => {
          const token = authService.getToken();
          if (!token) throw new Error('Refresh failed');
          refreshSubject.next(token);
          refreshSubject.complete();
          isRefreshing = false;
          return next(addToken(request, token));
        }),
        catchError((err) => {
          refreshSubject.error(err);
          isRefreshing = false;
          authService.logout();
          router.navigate(['/login']);
          return throwError(() => err);
        })
      );
    } else {
      return refreshSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((token) => next(addToken(request, token)))
      );
    }
  };

  const token = authService.getToken();
  const authReq = token ? addToken(req, token) : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('auth/refresh')) {
        return handle401Error(authReq, next);
      }
      return throwError(() => error);
    })
  );
};
