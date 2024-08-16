import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(`Intercepting request ${req.url}`);
  return next(req);
};
