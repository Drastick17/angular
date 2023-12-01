export interface ProductoStock {
  pro_Id: number;
  pro_Descripcion: string;
  pro_Nombre: string;
  pro_Precio: number;
  pro_ExcentoIva: number;
  pro_FechaCreacion: Date | string;
  pro_Estado: number;
  CantidadTotal: number; //TO-DO CHANGE
}
