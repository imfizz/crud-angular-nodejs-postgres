import { Component, OnInit, Input } from '@angular/core';
import { DatasService } from '../../services/datas.service';
import { Person } from '../../Person';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {

  persons: Person[] = [];

  constructor(private datasService: DatasService) { }

  ngOnInit(): void {
    this.datasService.getDatas().subscribe((persons) => this.persons = persons);
  }

  deletePerson(person: Person) {
    if(confirm('Are you sure you want to delete?')){
      this.datasService.deleteTask(person).subscribe(() => (this.persons = this.persons.filter( t => t.id !== person.id)));
    }
  }

  addPerson(person: Person) {
    this.datasService.addPerson(person).subscribe((person) => {
        this.persons.push(person);
        this.ngOnInit(); // reload the table
      });
  }

}
