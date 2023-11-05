import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

class BaseComponent {
  name!: string;
  fc!: FormControl;
  wasSubmitted!: boolean;
  // User defined messages, key is errorName and value is the message
  messages: {[key: string]: string} = {};

  private convertErrorsToMessage(name: string, errors: ValidationErrors | null) : string|undefined {
    // console.log({name, errors: errors})
    if (errors == null)
      return;
    var entries = Object.entries(errors);
    if (entries.length == 0)
      return;
    var [errorName, errorContent] = entries[0];
    // console.log(errorName, errorContent);


    // Check if errorName is in user-defined messages
    if (errorName in this.messages)
      return this.messages[errorName];


    switch (errorName) {
      case 'required':
        return `${name} is required`;
      case 'min':
        return `${name} has to be greater than or equal to ${errorContent.min}`;
      case 'max':
        return `${name} has to be less than or equal to ${errorContent.max}`;
      case 'minlength':
        return `${name} has to be at least ${errorContent.requiredLength} characters`;
      case 'maxlength':
        return `${name} has to be at least ${errorContent.requiredLength} characters`;
      case 'email':
        return (name.toLowerCase() != 'email')
          ? `${name} is not a valid email`
          : `${name} is not valid`;
      case 'pattern':
        return `${name} is not valid`;

      default:
        console.warn(`The error ${errorName} was not catched`, errorContent);
        return `${name} is not valid`;
    }
  }

  public errorMessages() {
    if (this.fc.dirty || this.wasSubmitted)
      return this.convertErrorsToMessage(this.name, this.fc.errors);
    return;
  }

  public invalidCondition = (fc: FormControl) => fc.invalid && (fc.dirty || this.wasSubmitted);
  // public validCondition = (fc: FormControl) => fc.valid && (fc.dirty || this.wasSubmitted);
  public validCondition = (fc: FormControl) => fc.valid && this.wasSubmitted;
}


@Component({
  selector: 'x-input',
  template: `
    <div class="mb-3">
      <label [for]="name" class="form-label"> {{ label }} </label>
      <input type="email" class="form-control" [id]="name" [name]="name" [formControl]="fc"
          autocomplete="off" spellcheck="false"
          [class.is-invalid]="invalidCondition(fc)" [class.is-valid]="validCondition(fc)"
          >
      <span class="invalid-feedback">
        {{ errorMessages() }}
      </span>
    </div>
  `,
})
export class InputComponent extends BaseComponent implements OnInit {
  @Input() label = 'defaultLabel';
  @Input() override name = 'defaultName';
  @Input() override fc!: FormControl;
  @Input() override wasSubmitted = false;
  @Input() override messages = {};

  ngOnInit() {
    if (this.name == 'defaultName')
      this.name = this.label;
  }
}
