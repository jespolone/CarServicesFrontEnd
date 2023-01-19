import { Component } from '@angular/core';
import { ModalService } from '../_services/modal.service';
@Component({
  selector: 'app-form-field-label-example',
  templateUrl: './form-field-label-example.component.html',
  styleUrls: ['./form-field-label-example.component.css']
})
export class FormFieldLabelExampleComponent{
  bodyText = 'This text can be updated in modal 1';
  constructor(public modalService: ModalService) { }

}
