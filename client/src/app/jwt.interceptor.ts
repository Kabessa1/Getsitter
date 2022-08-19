import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
const TOKEN_HEADER_KEY = 'x-access-token';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private storageService: StorageService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('login') || req.url.includes('register')) {
        return next.handle(req);
    } 

    var authReq = req
    const token = this.storageService.getUser().accessToken;
    
    if (token) {
        authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, token)})
    }
    
    return next.handle(authReq);
  }
}