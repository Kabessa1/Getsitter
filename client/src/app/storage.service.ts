import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);

  get isLoggedIn$(): Observable<boolean> {
    return this._isLoggedIn$.asObservable()
  }
  
  constructor() {
    this._isLoggedIn$.next(this.isLoggedIn());
  }

  clean(): void {
    window.sessionStorage.clear();
    this._isLoggedIn$.next(false);
  }

  saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    this._isLoggedIn$.next(true);
  }

  getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }
    return false;
  }
}
