


import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/interfaces/producto';
import { Estado } from 'src/app/interfaces/estado';
import { EstadoService } from 'src/app/services/estado.service';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import *as moment from "moment";

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
  selector: 'app-dialog-producto',
  templateUrl: './dialog-producto.component.html',
  styleUrls: ['./dialog-producto.component.css'],
  providers:[{
    provide:MY_DATE_FORMATS,useValue:MY_DATE_FORMATS
  }]
})
export class DialogProductoComponent implements OnInit {
  formEst: FormGroup;
  action = "Nuevo Producto"
  buttonForm = "Guardar"
  listEstados:Estado[] = []

  alert(msg: string, action: string) {
    this._snackBar.open(msg, action, { horizontalPosition: "end", verticalPosition: "top", duration: 3000 })
  }

  constructor(
    private dialogRef: MatDialogRef<DialogProductoComponent>,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _productoService: ProductoService,
    private _estadoService: EstadoService,
    @Inject(MAT_DIALOG_DATA) public dataProducto: Producto) {
    this.formEst = this.fb.group({
      "pro_Id": [""],
      "pro_Descripcion": ["", Validators.required],
      "pro_Nombre": ["", Validators.required],
      "pro_Precio": ["", Validators.required],
      "pro_ExcentoIva": ["", Validators.required],
      "pro_FechaCreacion": [new Date(), Validators.required],
      "pro_Estado": ["", Validators.required]
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
  }

  ngOnInit(): void {
    if (!this.dataProducto) return;
    this.action = "Actualizar Producto"
    this.buttonForm = "Actualizar"
    this.formEst.patchValue({
      pro_Id: this.dataProducto.pro_Id,
      pro_Descripcion: this.dataProducto.pro_Descripcion,
      pro_Nombre: this.dataProducto.pro_Nombre,
      pro_Precio: this.dataProducto.pro_Precio,
      pro_ExcentoIva: this.dataProducto.pro_ExcentoIva,
      pro_FechaCreacion:moment(this.dataProducto.pro_FechaCreacion).format("YYYY-MM-DDTHH:mm:ss"),
      pro_Estado:this.dataProducto.pro_Estado
    })
  }

  handleProduct() {
    const producto: Producto = {
      pro_Id: this.formEst.value.pro_Id  == "" ? 0 : this.formEst.value.pro_Id,
      pro_Descripcion: this.formEst.value.pro_Descripcion,
      pro_Nombre: this.formEst.value.pro_Nombre,
      pro_Precio: this.formEst.value.pro_Precio,
      pro_ExcentoIva: this.formEst.value.pro_ExcentoIva,
      pro_FechaCreacion:moment(this.formEst.value.pro_FechaCreacion).format("YYYY-MM-DDTHH:mm:ss"),
      pro_Estado:this.formEst.value.pro_Estado
    }
    this.dataProducto
      ? this.editProducto(producto)
      : this.addProducto(producto)
  }

  addProducto(producto: Producto) {
    this._productoService.Create(producto).subscribe({
      next: (data) => {
        this.alert("Se creo el nuevo producto", "Success")
        this.dialogRef.close();
      }, error: (e) => {
        console.error(e)
        this.alert("Error en el insert", "Error")
      }
    })
  }

  editProducto(producto: Producto) {
    this._productoService.Update(producto.pro_Id, producto).subscribe({
      next: (data) => {
        this.alert("Se actualizo el producto", "Success")
        this.dialogRef.close();
      }, error: (e) => {
        console.error(e)
        this.alert("Error en el actualizar", "Error")
      }
    })
  }

}
