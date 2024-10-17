import { Component, Inject, signal } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {
  public title = signal('');
  public message = signal('');
  public acceptLabel = signal('Aceptar');

  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string; acceptLabel: string }
  ) {
    this.title.set(data.title);
    this.message.set(data.message);
    this.acceptLabel.set(data.acceptLabel);
  }

  public onAccept(): void {
    this.dialogRef.close(true);
  }

  public onClose(): void {
    this.dialogRef.close(false);
  }
}
