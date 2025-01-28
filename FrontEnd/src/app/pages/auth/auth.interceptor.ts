import { HttpInterceptorFn, HttpRequest, HttpEvent, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

// Move isRefreshing outside the interceptor function to maintain state
let isRefreshing = false;

export const authInterceptorFn: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  function addToken(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  function handle401Error(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    if (!isRefreshing) {
      isRefreshing = true;

      return new Observable(observer => {
        authService.refreshToken()
          .then(() => {
            isRefreshing = false;
            const token = authService.getToken();
            if (token) {
              observer.next();
            } else {
              observer.error('No token available');
            }
          })
          .catch(err => {
            isRefreshing = false;
            observer.error(err);
          })
          .finally(() => observer.complete());
      }).pipe(
        switchMap(() => {
          const token = authService.getToken();
          return token 
            ? next(addToken(request, token)) 
            : throwError(() => new Error('No token available'));
        })
      );
    }
    
    return next(request);
  }

  // Main interceptor logic
  const token = authService.getToken();

  if (token) {
    req = addToken(req, token);
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('auth/refresh')) {
        return handle401Error(req, next);
      }
      return throwError(() => error);
    })
  );
};