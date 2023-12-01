


import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Estado } from 'src/app/interfaces/estado';
import { EstadoService } from 'src/app/services/estado.service';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import *as moment from "moment";
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/interfaces/producto';
import { Move } from 'src/app/interfaces/move';

import { THistorico } from 'src/app/interfaces/thistorico';
import { ThistoricoService } from 'src/app/services/thistorico.service';
import { Anulacion } from 'src/app/interfaces/anulacion';

export const MY_DATE_FORMATS={
  parse:{
    dateinput:'DD/MM/YYYY',
  },
  display:{
    dateinput:'DD/MM/YYYY',
    monthYearLabel:'MMMM YYYY',
    dateA11yLabel:'LL',
    monthYearA11yLabel:'MMMM YYYY'
  }
}

@Component({
  selector: 'app-dialog-anular',
  templateUrl: './dialog-anular.component.html',
  styleUrls: ['./dialog-anular.component.css'],
  providers:[{
    provide:MY_DATE_FORMATS,useValue:MY_DATE_FORMATS
  }]
})
export class DialogAnularComponent {
  formEst: FormGroup;
  action = "Anular Venta"
  buttonForm = "Anular"
  listVentas:THistorico[] = []

  alert(msg: string, action: string) {
    this._snackBar.open(msg, action, { horizontalPosition: "end", verticalPosition: "top", duration: 3000 })
  }

  constructor(
    private dialogRef: MatDialogRef<DialogAnularComponent>,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _productoService: ProductoService,
    private _historicoService: ThistoricoService,
    @Inject(MAT_DIALOG_DATA) public data: Anulacion) {
    this.formEst = this.fb.group({
      id:["", Validators.required],
    })

    this._historicoService.List().subscribe({
      next:data =>{

        this.listVentas = data.filter(venta => venta.hbod_Movimiento === 'Venta');
      },
      error:e => {
        console.error(e)
        this.alert("Error al listar los productos", "Error")
      }
    })
  }


  anular() {
    const anula: Anulacion = {
      id: this.formEst.value.id,
    }
      this._productoService.Back(anula.id).subscribe({
      next: (data) => {
        this.alert("Se anulo la venta", "Success")
        this.dialogRef.close();
      }, error: (e) => {
        console.error(e)
        this.alert("Error en la anulacion", "Error")
      }
    })
  }


}
