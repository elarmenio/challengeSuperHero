import { Component, Inject, OnInit, signal } from '@angular/core';
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
  public titleSignal = signal('');
  public isFormValidSignal = signal(false);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AddEditSuperHero,
    private dialogRef: MatDialogRef<HeroFormComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.titleSignal.set(this.data.title);
    this.initializeForm();
    this.form.valueChanges.subscribe(() => {
      this.isFormValidSignal.set(this.form.valid);
    });
  }

  initializeForm() {
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
      nameControl.setValue(nameControl.value.toUpperCase());
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData = {
        id: this.form.get('id')?.value,
        name: this.form.get('name')?.value,
        power: this.form.get('power')?.value,
        description: this.form.get('description')?.value,
        image: this.form.get('image')?.value,
      };
      this.dialogRef.close({ value: formData });
    }
  }

  dismiss() {
    this.dialogRef.close();
  }
}
