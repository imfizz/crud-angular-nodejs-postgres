import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { Person } from '../../Person';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {
  @Output() onAddPerson: EventEmitter<Person> = new EventEmitter();
  name: string;
  age: number;
  gender: string;
  showAddPerson: boolean;
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe(value => this.showAddPerson = value)
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if(!this.name || !this.age || !this.gender){
      alert('All input fields are required!!');
      return;
    }

    const newPerson = {
      name: this.name,
      age: this.age,
      gender: this.gender
    }

    // emit
    this.onAddPerson.emit(newPerson)

    this.name = '';
    this.age = 0;
    this.gender = '';
  }

}
