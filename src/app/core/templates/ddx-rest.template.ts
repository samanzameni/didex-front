import { HttpHeaders, HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { StorageService } from '@core/services/ddx-storage.service';
import { CONSTANTS } from '@core/util/constants';
import { environment } from '@environments/environment';

export abstract class AbstractRESTService {
  private userAccessToken: string;
  protected baseURL: string;

  constructor(
    protected storageService: StorageService,
    protected http: HttpClient
  ) {
    this.baseURL = environment.production
      ? CONSTANTS.SERVER_URL
      : CONSTANTS.MOCK_SERVER_URL;

    this.storageService.getUserAccessToken().subscribe(token => {
      if (token) {
        this.userAccessToken = token;
      }
    });
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
  ): Observable<object> {
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
  public httpGET(url: string): Observable<object> {
    return this.http.get(this.baseURL + url, {
      headers: this.getFullHeaders(),
    });
  }

  /**
   * Sends a POST request with custom headers
   *
   */
  public httpPOST(url: string, body: object): Observable<object> {
    return this.http.post(this.baseURL + url, body, {
      headers: this.getFullHeaders(),
    });
  }

  /**
   * Sends a POST request with formData body type and custom headers
   *
   */
  public httpPOSTFormData(url: string, formData: FormData): Observable<object> {
    return this.http.post(this.baseURL + url, formData, {
      headers: this.getAuthHeaders(),
    });
  }

  /**
   * Sends a PUT request with custom headers
   *
   */
  public httpPUT(url: string, body: object): Observable<object> {
    return this.http.put(this.baseURL + url, body, {
      headers: this.getFullHeaders(),
    });
  }

  /**
   * Sends a DELETE request with custom headers
   *
   */
  public httpDELETE(url: string): Observable<object> {
    return this.http.delete(this.baseURL + url, {
      headers: this.getFullHeaders(),
    });
  }

  /**
   * Sets the header with bearer token authorization appended to it.
   *
   */
  private getFullHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.userAccessToken,
      'Content-Type': 'application/json; charset=utf-8',
    });
    return headers;
  }

  private getAuthHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.userAccessToken,
    });
    return headers;
  }
}
