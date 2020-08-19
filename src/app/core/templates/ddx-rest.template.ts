import { HttpHeaders, HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as jwtDecode from 'jwt-decode';

import { StorageService } from '@core/services/ddx-storage.service';
import { LocaleService } from '@core/services/ddx-locale.service';
import { CONSTANTS } from '@core/util/constants';
import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class AbstractRESTService {
  private userAccessToken: string;
  private region: string;
  protected baseURL: string;

  constructor(
    protected storageService: StorageService,
    protected http: HttpClient,
    protected localeService: LocaleService
  ) {
    this.baseURL = environment.production
      ? CONSTANTS.SERVER_URL
      : CONSTANTS.MOCK_SERVER_URL;

    this.userAccessToken = this.storageService.getUserAccessToken();
    this.region = this.userAccessToken ? jwtDecode(this.userAccessToken) : '1';
  }

  /**
   * Sends a custom request to ANY url WITHOUT custom headers,
   * so be careful using this.
   *
   */
  protected httpAbsoluteRequest(
    url: string,
    method: string,
    body?: object
  ): Observable<any> {
    switch (method) {
      case 'GET':
        return this.http.get(url);
      case 'POST':
        return this.http.post(url, body);
      case 'PUT':
        return this.http.put(url, body);
      case 'DELETE':
        return this.http.delete(url);
      default:
        return undefined;
    }
  }

  /**
   * Sends a custom request to the url + base WITHOUT custom headers,
   * so be careful using this.
   *
   */
  protected httpPureRequest(
    url: string,
    method: string,
    body?: object
  ): Observable<any> {
    url = this.baseURL + url;
    switch (method) {
      case 'GET':
        return this.http.get(url);
      case 'POST':
        return this.http.post(url, body);
      case 'PUT':
        return this.http.put(url, body);
      case 'DELETE':
        return this.http.delete(url);
      default:
        return undefined;
    }
  }

  /**
   * Sends a GET request with custom headers
   *
   */
  public httpGET(url: string): Observable<any> {
    return this.http.get(this.baseURL + url, {
      headers: this.getFullHeaders(),
    });
  }

  /**
   * Sends a GET request with custom headers
   *
   */
  protected httpPublicGET(url: string): Observable<any> {
    return this.http.get(this.baseURL + url, {
      headers: this.getPublicHeaders(),
    });
  }

  /**
   * Sends a POST request with custom headers
   *
   */
  public httpPOST(url: string, body: object): Observable<any> {
    return this.http.post(this.baseURL + url, body, {
      headers: this.getFullHeaders(),
    });
  }

  /**
   * Sends a POST request with formData body type and custom headers
   *
   */
  public httpPOSTFormData(url: string, formData: FormData): Observable<any> {
    return this.http.post(this.baseURL + url, formData, {
      headers: this.getAuthHeaders(),
    });
  }

  /**
   * Sends a PUT request with custom headers
   *
   */
  public httpPUT(url: string, body: object): Observable<any> {
    return this.http.put(this.baseURL + url, body, {
      headers: this.getFullHeaders(),
    });
  }

  /**
   * Sends a PATCH request with custom headers
   *
   */
  public httpPATCH(url: string, body: object): Observable<any> {
    return this.http.patch(this.baseURL + url, body, {
      headers: this.getFullHeaders(),
    });
  }

  /**
   * Sends a DELETE request with custom headers
   *
   */
  public httpDELETE(url: string): Observable<any> {
    return this.http.delete(this.baseURL + url, {
      headers: this.getFullHeaders(),
    });
  }

  /**
   * Sets the header with bearer token authorization appended to it.
   *
   */
  private getFullHeaders(): HttpHeaders {
    this.userAccessToken = this.storageService.getUserAccessToken();
    this.region = this.determineRegion();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.userAccessToken,
      'Content-Type': 'application/json; charset=utf-8',
      'Accept-Language': this.localeService.currentLocale,
      'Accept-Region': this.region,
    });
    return headers;
  }

  private getAuthHeaders(): HttpHeaders {
    this.userAccessToken = this.storageService.getUserAccessToken();
    this.region = this.determineRegion();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.userAccessToken,
      'Accept-Language': this.localeService.currentLocale,
      'Accept-Region': this.region,
    });
    return headers;
  }

  private getPublicHeaders(): HttpHeaders {
    this.userAccessToken = this.storageService.getUserAccessToken();
    this.region = this.determineRegion();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Accept-Language': this.localeService.currentLocale,
      'Accept-Region': this.region,
    });
    return headers;
  }

  private determineRegion(): string {
    if (this.userAccessToken) {
      return jwtDecode(this.userAccessToken).region;
    } else {
      if (window.location.hostname.endsWith('.ir')) {
        return '2';
      } else {
        return '1';
      }
    }
  }
}
