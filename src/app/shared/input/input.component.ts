import { Component, OnInit, Input, AfterContentInit, ContentChild } from '@angular/core';
import { NgModel, FormControlName } from '@angular/forms';
import { TagPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';

@Component({
  selector: 'mt-input-container',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, AfterContentInit {

  input: any  // A variável input serve pra pegar a referência a diretiva NgModel. 


  @Input() label: string
  @Input() errorMessage: string
  @Input() showTip = true

  @ContentChild(NgModel) model: NgModel
  @ContentChild(FormControlName) control: FormControlName

  constructor() { }

  ngAfterContentInit(): void {
    this.input = this.model || this.control
    if (this.input === undefined) {
      throw new Error('Esse componente precisa ser usado com uma diretiva ngModel ou formControlName')
    }

  }

  ngOnInit() {
  }

  hasSuccess(): boolean {
    return this.input.valid && (this.input.dirty || this.input.touched)
  }

  hasError(): boolean {
    return this.input.invalid && (this.input.dirty || this.input.touched)
  }

}
