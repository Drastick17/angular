import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Producto } from 'src/app/interfaces/producto';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css']
})
export class DialogDeleteComponent {
  constructor(private dialogRef:MatDialogRef<DialogDeleteComponent>, 
    @Inject(MAT_DIALOG_DATA) public dataProducto:Producto ){}

  delete(){
    this.dialogRef.close("deleted")
  }
}
