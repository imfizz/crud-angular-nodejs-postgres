import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../Person';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}


@Injectable({
  providedIn: 'root'
})
export class DatasService {
  private apiUrl = 'http://localhost:5000/person';

  constructor(private http: HttpClient) { }

  getDatas(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl)
  }

  deleteTask(person: Person): Observable<Person> {
    const url = `${this.apiUrl}/${person.id}`;
    return this.http.delete<Person>(url);
  }

  updatePerson(person: Person): Observable<Person> {
    const url = `${this.apiUrl}/${person.id}`;
    return this.http.put<Person>(url, person, httpOptions)
  }

  addPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.apiUrl, person, httpOptions);
  }

}
