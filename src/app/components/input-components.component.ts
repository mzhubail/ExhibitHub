import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

class BaseComponent {
  name!: string;
  fc!: FormControl;
  wasSubmitted!: boolean;

  private convertErrorsToMessage(name: string, errors: ValidationErrors | null) : string|undefined {
    // console.log({name, errors: errors})
    if (errors == null)
      return;
    var entries = Object.entries(errors);
    if (entries.length == 0)
      return;
    var [errorName, errorContent] = entries[0];
    // console.log(errorName, errorContent);
    switch (errorName) {
      case 'required':
        return `${name} is required`;
      case 'minlength':
        return `${name} has to be at least ${errorContent.requiredLength} characters`;

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

  public validCondition = (fc: FormControl) => fc.invalid && (fc.dirty || this.wasSubmitted);
}

@Component({
  selector: 'x-input',
  template: `
    <div class="mb-3">
      <label [for]="name" class="form-label"> {{ label }} </label>
      <input type="email" class="form-control" [id]="name" [name]="name" [formControl]="fc"
          autocomplete="off" spellcheck="false" [class.is-invalid]="validCondition(fc)">
      {{ errorMessages() }}
    </div>
  `,
})
export class InputComponent extends BaseComponent implements OnInit {
  @Input() label = 'defaultLabel';
  @Input() override name = 'defaultName';
  @Input() override fc!: FormControl;
  @Input() override wasSubmitted = false;

  ngOnInit() {
    this.name = this.label;
  }
}
