import { Injectable } from '@angular/core';
import {Cv, User} from "../Cv";
import {Observable, of, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({

    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CvService {
  private apiUrl = 'http://localhost:3000/cvs'
  private apiUrl2 = 'http://localhost:3000/users'
  private  subject = new Subject<string>();



  constructor(private http:HttpClient) { }



  getCvs(): Observable<Cv[]> {
    return this.http.get<Cv[]>(this.apiUrl)
  }

  getUsers(): Observable<Cv[]> {
    return this.http.get<Cv[]>(this.apiUrl2)
  }

  addCv(cv: Cv):Observable<Cv> {
    return this.http.post<Cv>(this.apiUrl2, cv, httpOptions);
  }

  sendCv(cv: Cv):Observable<Cv> {
    return this.http.post<Cv>(this.apiUrl, cv, httpOptions);
  }

  deleteCv(cv: Cv): Observable<Cv> {
    const url = `${this.apiUrl2}/${cv.id}`;
    return this.http.delete<Cv>(url);
  }

  eraseCv(cv: Cv): Observable<Cv> {
    const url = `${this.apiUrl}/${cv.id}`;
    return this.http.delete<Cv>(url);
  }

  sendMessage(message: string) {
    this.subject.next(message);
  }

  receivedMessage(): Observable<string> {
    return this.subject.asObservable();
  }

}
