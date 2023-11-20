import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent, InputComponent } from './input-components.component';



var components = [
  InputComponent,
  FormComponent,

]

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  exports: components,
})
export class ComponentsModule { }
