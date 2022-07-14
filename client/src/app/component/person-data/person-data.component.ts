import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Person } from '../../Person';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-person-data',
  templateUrl: './person-data.component.html',
  styleUrls: ['./person-data.component.css']
})
export class PersonDataComponent implements OnInit {
  @Input() person: Person;
  @Output() onDeletePerson: EventEmitter<Person> = new EventEmitter();

  faPen = faPen;
  faTrash = faTrash;

  constructor() { }

  ngOnInit(): void {
  }

  onDelete(person) {
    this.onDeletePerson.emit(person)
  }

}
