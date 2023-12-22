import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent, InputComponent } from './input-components.component';
import { CardsSliderComponent } from './cards-slider.component';
import { GallerySliderComponent } from './gallery-slider.component';
import { AboutUsComponent } from './about-us.component';
import { AccountPageComponentComponent } from './account-page-component.component';

var components = [
  InputComponent,
  FormComponent,
  GallerySliderComponent,
  CardsSliderComponent,
  AboutUsComponent,
  AccountPageComponentComponent,
];

@NgModule({
  declarations: components,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: components,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
