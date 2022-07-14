import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DatasService } from '../../services/datas.service';
import { Person } from '../../Person';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-person',
  templateUrl: './update-person.component.html',
  styleUrls: ['./update-person.component.css']
})
export class UpdatePersonComponent implements OnInit {
  id: number;
  name: string;
  age: number;
  gender: string;

  constructor(private datasService: DatasService, private route: ActivatedRoute, private router: Router) { }

  persons: Person[] = [];

  ngOnInit(): void {
    this.datasService.getDatas().subscribe((persons) => this.persons = persons);
    this.id = this.route.snapshot.params['id'];
    this.name = this.route.snapshot.params['name'];
    this.age = this.route.snapshot.params['age'];
    this.gender = this.route.snapshot.params['gender'];
  }

  onSubmit() {
    if(!this.name || !this.age || !this.gender){
      alert('All input fields are required!!');
      return;
    }

    // updated data
    const newPerson = {
      id: this.id,
      name: this.name,
      age: this.age,
      gender: this.gender
    }

    // this will update the data 
    this.datasService.updatePerson(newPerson).subscribe((person) => {
      this.ngOnInit(); // reload the data
    });

    // resetter
    this.id = 0;
    this.name = '';
    this.age = 0;
    this.gender = '';

    // redirect to home page
    this.router.navigate(['/']); 
  }

}
