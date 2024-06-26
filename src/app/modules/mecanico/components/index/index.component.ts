import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/services/service';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit{

    displayedColumns: string[] = ['id', 'nombre', 'apellidoPaterno', 'apellidoMaterno', 'acciones'];
    dataSource = new MatTableDataSource<any>([]);

    cantidadTotal = 0;
    cantidadPorPagina = 10;
    numeroDePagina = 0;
    opcionesDePaginado: number[] = [1,5,10, 25, 100];

    textoBusqueda = '';

  constructor(
    private _httpService: HttpService,
    private _toastr: ToastrService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this._httpService.getAll(this.cantidadPorPagina, this.numeroDePagina, this.textoBusqueda)
    .subscribe((respuesta: any) => {
      this.dataSource.data = respuesta.datos.elemento;
      this.cantidadTotal = respuesta.datos.cantidadTotal;
    })
  }

  cambiarPagina(event: any){
    this.cantidadPorPagina = event.pageSize;
    this.numeroDePagina = event.pageIndex;

    this.getAll();
  }

  delete(mecanicoId: number){
    console.log('Eliminar mecánico con ID:', mecanicoId); // Agregar console.log aquí

    
    let confirmacion = confirm('¿Deseas eliminarlo?')

    if(confirmacion){
      let ids = [mecanicoId]

      this._httpService.delete(ids)
      .subscribe((respuesta: any) => {
        this._toastr.success('Mecanico Eliminado', 'Confirmacion')
        this.getAll();
      });
    };
  }

  crearMecanico(){
    const dialogRef = this._dialog.open(FormComponent, {
      disableClose: true,
      autoFocus: true,
      closeOnNavigation: false,
      position: { top: '30px'},
      width: '700px',
      data: {

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // Si el resultado es verdadero, muestra un mensaje de éxito
        this._toastr.success('Registro Exitoso', 'Confirmacion');
        // Luego, recarga los datos
        this.getAll();
      }
    });
  }

}
