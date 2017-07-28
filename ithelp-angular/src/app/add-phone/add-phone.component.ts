import { Component, OnInit } from '@angular/core';
import { FileUploader } from "ng2-file-upload";
import { SessionService } from "../session.service";

@Component({
  selector: 'app-add-phone',
  templateUrl: './add-phone.component.html',
  styleUrls: ['./add-phone.component.css']
})
export class AddPhoneComponent implements OnInit {
  uploader: FileUploader = new FileUploader({
    url: `http://localhost:3000/api/phones/`,
    authToken: `JWT ${this.session.token}`
  });

	newPhone = {
    name: '',
    brand: '',
    specs: []
  };

  feedback: string;
  constructor(private session: SessionService ) { }

  ngOnInit() {
  	this.uploader.onSuccessItem = (item, response) => {
      this.feedback = JSON.parse(response).message;
    };

    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.feedback = JSON.parse(response).message;
    };
  }

  addSpec(spec) {
    this.newPhone.specs.push(spec);
  }

  submit() {
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('name', this.newPhone.name);
      form.append('brand', this.newPhone.brand);
      form.append('specs', JSON.stringify(this.newPhone.specs));
    };
    
    this.uploader.uploadAll();
  }

}
