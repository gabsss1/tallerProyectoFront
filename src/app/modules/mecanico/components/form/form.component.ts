import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpService } from 'src/app/services/service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{

  formGroup!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FormComponent>,
    private fb: FormBuilder,
    private httpService: HttpService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  cancelar(){
    this.dialogRef.close()
  }

  guardar(){
    if (this.formGroup.valid) {
      const formData = this.formGroup.value;
      this.httpService.post(formData).subscribe(response => {
        console.log('Respuesta del servidor:', response);
        this.dialogRef.close();
        location.reload();
        this.toastr.success('Registro exitoso', 'Éxito'); // Toastr para registro exitoso
      }, error => {
        console.error('Error al guardar:', error);
      });
    }
  }
  

  initForm(){
    this.formGroup = this.fb.group({
      nombre: [null , [Validators.required]],
      apellidoPaterno: [null, [Validators.required]],
      apellidoMaterno: [null, [Validators.required]],
      habilitado: [null, [Validators.required]],
    })
  }
}
