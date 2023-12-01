import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from "@angular/material/table";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { DialogProductoComponent } from './dialogs/dialog-producto/dialog-producto.component';
import { DialogDeleteComponent } from './dialogs/dialog-delete/dialog-delete.component';
import { ExportButtonComponent } from './export-button/export-button.component';
import { DialoComprarComponent } from './dialogs/dialog-comprar/dialog-comprar.component';
import { DialoVenderComponent } from './dialogs/dialog-vender/dialog-vender.component';
import { DialogAnularComponent } from './dialogs/dialog-anular/dialog-anular.component';
@NgModule({
  declarations: [
    AppComponent,
    DialoComprarComponent,
    DialogProductoComponent,
    DialogDeleteComponent,
    ExportButtonComponent,
    DialoVenderComponent,
    DialogAnularComponent,
  ],
  imports: [
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatGridListModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
