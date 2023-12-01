import { AfterViewInit, ViewChild, Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Producto } from './interfaces/producto';
import { ProductoService } from './services/producto.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogProductoComponent } from './dialogs/dialog-producto/dialog-producto.component';
import { DialogDeleteComponent } from './dialogs/dialog-delete/dialog-delete.component';
import { ProductoStock } from './interfaces/productoStock';
import { DialoComprarComponent } from './dialogs/dialog-comprar/dialog-comprar.component';
import { DialoVenderComponent } from './dialogs/dialog-vender/dialog-vender.component';
import { DialogAnularComponent } from './dialogs/dialog-anular/dialog-anular.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'Danny';
  displayColumns: string[] = [
    'ID',
    'NOMBRE',
    'DESCRIPCION',
    'PRECIO',
    'IVA',
    'FECHA DE CREACION',
    'ESTADOID',
    'STOCK',
    'ACCION',
  ];
  dataSourceProducto = new MatTableDataSource<ProductoStock>();
  rawData: ProductoStock[] = [];

  alert(msg: string, action: string) {
    this._snackBar.open(msg, action, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
    });
  }

  constructor(
    private _productoService: ProductoService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceProducto.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSourceProducto.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.listAll();
  }

  listAll() {
    this._productoService.ListStock().subscribe({
      next: (list: ProductoStock[]) => {
        const newList = list.filter((product) => product.CantidadTotal !== 0);
        this.dataSourceProducto.data = newList;
        this.rawData = newList;
      },
      error: (e) => console.error(e),
    });
  }

  openDialog() {
    this.dialog
      .open(DialogProductoComponent, { disableClose: true, width: '50vw' })
      .afterClosed()
      .subscribe((result) => {
        this.listAll();
      });
  }


  openDialogBuy() {
    this.dialog
      .open(DialoComprarComponent, { disableClose: true, width: '50vw' })
      .afterClosed()
      .subscribe((result) => {
        this.listAll();
      });
  }

  openDialogSell() {
    this.dialog
      .open(DialoVenderComponent, { disableClose: true, width: '50vw' })
      .afterClosed()
      .subscribe((result) => {
        this.listAll();
      });
  }


  openDialogAnular() {
    this.dialog
      .open(DialogAnularComponent, { disableClose: true, width: '50vw' })
      .afterClosed()
      .subscribe((result) => {
        this.listAll();
      });
  }


  openEditDialog(data: ProductoStock[]) {
    this.dialog
      .open(DialogProductoComponent, {
        disableClose: true,
        width: '50vw',
        data,
      })
      .afterClosed()
      .subscribe((result) => {
        this.listAll();
      });
  }

  openDeleteDialog(id: number) {
    this.dialog
      .open(DialogDeleteComponent, { disableClose: true, width: '50vw' })
      .afterClosed()
      .subscribe((result) => {
        if (result === 'deleted') {
          this.deleteProduct(id);
        }
      });
  }

  deleteProduct(id: number) {
    this._productoService.Delete(id).subscribe({
      next: () => {
        this.alert('Se elimino el producto', 'Success');
        this.listAll();
      },
      error: (e) => {
        console.error(e);
        this.alert('Error en el delete', 'Error');
      },
    });
  }
}
