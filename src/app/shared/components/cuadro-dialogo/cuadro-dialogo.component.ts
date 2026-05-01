import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cuadro-dialogo',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './cuadro-dialogo.component.html',
  styleUrl: './cuadro-dialogo.component.scss'
})
export class CuadroDialogoComponent {

  constructor(
    private readonly dialogRef: MatDialogRef<CuadroDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public dataShared: string,
    public readonly translate: TranslateService
  ) { }




  cancelar() {
    this.dialogRef.close(null);
  }

  confirmar() {
    this.dialogRef.close(true);
  }


}
