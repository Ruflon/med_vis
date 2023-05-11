import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, switchMap } from 'rxjs';

import { User } from '../model/user';
import { AuthenticationService } from './authentication.service';
import { FilterTypeParam } from '../model/get-method-enums';


@Injectable({providedIn:"root"})
export class ApiService {
  public static url = "http://localhost:8081/";

  constructor(private http: HttpClient, private authService: AuthenticationService) {}

  registerPatient(form: NgForm): Observable<User> {
    return this.http.post<User>(`${ApiService.url}registerPatient`, form.value)
      .pipe(
        map((user) => {
          return user;
        }),
        catchError((error) => {
          console.error(error);
          throw error as HttpErrorResponse;
        })
      );
  }

  login(form: NgForm): Observable<User> {
    return this.http.post<User>(`${ApiService.url}login`, form.value)
      .pipe(
        map(user => user),
        catchError((error) => {
          console.error(error);
          throw error as HttpErrorResponse;
        })
      );
  }

  getDoctors(page: number, filterType?: FilterTypeParam, filterKey?: string): Observable<any> {
    return this.authService.loggedUser.pipe(
      switchMap((user) => {
        let headers = new HttpHeaders();
        let queryParams = new HttpParams();

        if (user !== undefined && Object.keys(user).length !== 0) {
          headers = headers.set("Authorization", `Bearer ${user.token}`);
        }

        if (filterType != undefined && filterKey != undefined)  {
          queryParams = queryParams
              .append("filterType", filterType)
              .append("filterKey", filterKey);
        }

        queryParams = queryParams.append("offset", page.toString());
        queryParams = queryParams.append("pageSize", "10")

        return this.http.get<any>(`${ApiService.url}auth/doctor/doctors`, {
          headers: headers,
          params: queryParams
        })
      }),
      catchError((error) => {
        console.error(error);
        throw error as HttpErrorResponse;
      })
    );
  }
}
