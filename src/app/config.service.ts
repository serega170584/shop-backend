import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  configUrl = 'assets/config.json';
  constructor(private http: HttpClient) { }

  getconfig() {
    return this.http.get(this.configUrl);
  }
}
