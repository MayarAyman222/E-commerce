import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkKey = 'darkMode';
  private _isDark$ = new BehaviorSubject<boolean>(false);
  isDark$ = this._isDark$.asObservable();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {

    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem(this.darkKey);
      const isDark = saved === 'true';
      this._isDark$.next(isDark);
      this.setBodyClass(isDark);
    }
  }

  toggle() {
    const next = !this._isDark$.value;
    this._isDark$.next(next);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.darkKey, String(next));
    }

    this.setBodyClass(next);
  }

  setDark(value: boolean) {
    this._isDark$.next(value);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.darkKey, String(value));
    }

    this.setBodyClass(value);
  }

  private setBodyClass(isDark: boolean) {
    if (isDark) {
      this.document.body.classList.add('dark-mode');
    } else {
      this.document.body.classList.remove('dark-mode');
    }
  }
}
