import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string = 'Crud';
  language: string = 'Language: Angular, Node JS, PostgreSQL'

  showAddPerson: boolean;
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe(value => this.showAddPerson = value)
  }

  ngOnInit(): void {
  }

  toggleAddPerson() {
    this.uiService.toggleAddPerson();
  }

}
