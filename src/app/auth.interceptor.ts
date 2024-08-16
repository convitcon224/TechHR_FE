import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest, HttpResponse } from "@angular/common/http";
import { AuthService } from "./services/auth/auth.service";
import { Injectable, inject } from "@angular/core";

import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
      private router: Router,
      private authService: AuthService){}
    // private authService = inject(AuthService);

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = this.authService.getAuthToken();
      // console.log(`Intercepting request ${request.url}`);
      if (token) {
        const cloned = request.clone({
          setHeaders: {
            Authorization: `${token}`,
          },
        });
        return next.handle(cloned).pipe(
          tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              // do stuff with response if you want
            }
          }),
          catchError((err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                // redirect to the login route
                this.router.navigate(['/login']);
              }
            }
            return throwError(err);
          })
        )
      } else {
        // this.router.navigate(['/login']);
        return next.handle(request);
      }

      
    }
}
