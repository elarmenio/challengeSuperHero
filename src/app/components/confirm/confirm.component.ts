import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {
  public title: string = '';
  public message: string = '';
  public acceptLabel: string = 'Aceptar';

  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string; acceptLabel: string }
  ) {
    this.title = data.title;
    this.message = data.message;
    this.acceptLabel = data.acceptLabel;
  }

  public onAccept(): void {
    this.dialogRef.close(true);
  }

  public onClose(): void {
    this.dialogRef.close(false);
  }
}
