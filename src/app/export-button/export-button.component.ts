import { Component, Input } from '@angular/core';
// import * as XLSX from 'xlsx';
import { Producto } from '../interfaces/producto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoStock } from '../interfaces/productoStock';

@Component({
  selector: 'app-export-button',
  templateUrl: './export-button.component.html',
  styleUrls: ['./export-button.component.css']
})
export class ExportButtonComponent {
  @Input() data!: ProductoStock[];
  fileName = "reporte.xlsx";
  sheetName = ["reporte"];
  alert(msg: string, action: string) {
    this._snackBar.open(msg, action, { horizontalPosition: "end", verticalPosition: "top", duration: 3000 })
  }

  constructor (private _snackBar: MatSnackBar,) { }
  exportData(){
    if(this.data){
      // const products = this.data.map(product => ({
      //   Nombre:product.prO_Nombre,
      //   Descripcion: product.prO_Descripcion,
      //   Precio: product.prO_Precio,
      //   Iva: product.prO_ExcentoIva,
      //   "Fecha de creación":new Date(product.prO_FechaCreacion).toLocaleDateString("es-ES"),
      //   Estado: product.prO_Estado
      // }))
      // const workbook = XLSX.utils.book_new()
      // const worksheet = XLSX.utils.json_to_sheet(products); 
      // XLSX.utils.book_append_sheet(workbook, worksheet, this.sheetName[0]);
      // XLSX.writeFile(workbook, this.fileName);
    }else{
      this.alert("No hay datos que exportar", "Error")
    }
  }
}
