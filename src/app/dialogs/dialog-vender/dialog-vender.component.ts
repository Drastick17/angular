


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
  selector: 'app-dialog-vender',
  templateUrl: './dialog-vender.component.html',
  styleUrls: ['./dialog-vender.component.css'],
  providers:[{
    provide:MY_DATE_FORMATS,useValue:MY_DATE_FORMATS
  }]
})
export class DialoVenderComponent {
  formEst: FormGroup;
  action = "vender"
  buttonForm = "vender"
  listEstados:Estado[] = []
  listProductos:Producto[] = []

  alert(msg: string, action: string) {
    this._snackBar.open(msg, action, { horizontalPosition: "end", verticalPosition: "top", duration: 3000 })
  }

  constructor(
    private dialogRef: MatDialogRef<DialoVenderComponent>,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _productoService: ProductoService,
    private _estadoService: EstadoService,
    @Inject(MAT_DIALOG_DATA) public dataCompra: Move,) {
    this.formEst = this.fb.group({
      productID:["", Validators.required],
      cantidad: ["", Validators.required, Validators.min(1)],
      estado: ["", Validators.required],
    })

    this._estadoService.List().subscribe({
      next:data =>{
        this.listEstados = data;
      },
      error:e => {
        console.error(e)
        this.alert("Error al listar los estados", "Error")
      }
    })
    this._productoService.List().subscribe({
      next:data =>{
        this.listProductos = data;
      },
      error:e => {
        console.error(e)
        this.alert("Error al listar los productos", "Error")
      }
    })
  }


  sell() {
    const compra: Move = {
      productID: this.formEst.value.productID,
      cantidad: this.formEst.value.cantidad,
      estado: this.formEst.value.estado,
    }
      this._productoService.Sell(compra).subscribe({
      next: (data) => {
        
        if(data === 'venta'){
          this.alert("Se vendio el producto", "Success")
        }else{
          this.alert("No hay stock", "Error")
        }
        this.dialogRef.close();
      }, error: (e) => {
        console.error(e)
        this.alert("Error en la venta", "Error")
      }
    })
  }


}
