import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SlidesModalComponent } from '../components/slides-modal/slides-modal.component'; 

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  dialogRef: any;

  constructor(
    public matDialog: MatDialog
  ) { }

  openModal = (displayYearSixteen: boolean) => {

    this.dialogRef = this.matDialog.open(SlidesModalComponent, {
      "autoFocus":  false,
      panelClass:   'slides_modal',
      data:         displayYearSixteen
    });

  }

  closeModal = () => {
    this.dialogRef.close();
  }

}
