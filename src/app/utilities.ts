import { ValidationErrors } from "@angular/forms";


/** Converts angular provided validation errors to error message */
export function convertErrorsToMessage(name: string, errors: ValidationErrors | null): string | undefined {
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
      console.log(errors);
      console.warn(`The error '${errorName}' was not catched`, errorContent);
      return `${name} is not valid`;
  }
}

