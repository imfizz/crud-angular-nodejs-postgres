import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private showAddPerson: boolean = false;
  private subject = new Subject<any>();

  constructor() { }

  toggleAddPerson(): void {
    this.showAddPerson = !this.showAddPerson; // nag uupdate ng data
    this.subject.next(this.showAddPerson); // nagbibigay ng data
  } 

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
