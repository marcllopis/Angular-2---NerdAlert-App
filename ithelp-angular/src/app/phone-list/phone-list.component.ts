import { Component, OnInit } from '@angular/core';
import { PhoneService } from './../phone.service';

@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.css'],
  providers: [PhoneService]
})
export class PhoneListComponent implements OnInit {
	phones;
  constructor(private phone: PhoneService) { }

  ngOnInit() {
  	this.phone.getList()
      .subscribe((phones) => {
        this.phones = phones;
      });
  }

}
