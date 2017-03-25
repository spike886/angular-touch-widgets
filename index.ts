import {NgModule, ModuleWithProviders} from "@angular/core";
import {CommonModule} from "@angular/common";
import {} from "@ionic";
import {SampleComponent} from "./src/sample.component";
import {ClockEditor} from "./src/clock-editor.component";

export * from './src/sample.component';
export * from './src/clock-editor.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SampleComponent,
    ClockEditor,
  ],
  exports: [
    SampleComponent,
    ClockEditor,
  ]
})
export default class TouchComponentsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TouchComponentsModule,
    };
  }
}
