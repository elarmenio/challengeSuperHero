import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddEditSuperHero } from 'src/app/interfaces/SuperHero.interface';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss']
})
export class HeroFormComponent implements OnInit {
  public form!: FormGroup;
  public title : string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AddEditSuperHero
    , private dialogRef: MatDialogRef<HeroFormComponent>
    , private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.title = this.data.title;
    this.inicializeForm();
  }

  inicializeForm() {
    this.form = this.fb.group({
      id: [{ value: this.data.isEdit ? this.data.infoHero?.id : null, disabled: this.data.isEdit }, Validators.required],
      name: [this.data.isEdit ? this.data.infoHero?.name.toUpperCase() : null, Validators.required],
      power: [this.data.isEdit ? this.data.infoHero?.power : null, Validators.required],
      description: [this.data.isEdit ? this.data.infoHero?.description : ''],
      image: [this.data.isEdit ? this.data.infoHero?.image : '']
    });
  }
  
  onNameBlur() {
    const nameControl = this.form.get('name');
    if (nameControl) {
      nameControl.setValue(nameControl.value.toUpperCase()); // Convierte a mayúsculas
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      let form = {
        id: this.form.get('id')?.value,
        name :this.form.get('name')?.value,
        power: this.form.get('power')?.value,
        description: this.form.get('description')?.value,
        image :this.form.get('image')?.value,
      }
      this.dialogRef.close({
        value: form
      });
    }
  }

  dismiss(){
    this.dialogRef.close();
  }
}
