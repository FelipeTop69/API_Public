import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../Models/user.model';
import { UserService } from '../../Services/user.service';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { GenericTableComponent } from "../../General/generic-table/generic-table.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-indice-user',
  imports: [MatCardModule, GenericTableComponent, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './indice-user.component.html',
  styleUrl: './indice-user.component.css'
})
export class IndiceUserComponent implements OnInit {
  
  userService = inject(UserService)
  router = inject(Router)

  dataUsers: User[] = []
  columnas: string[] = ['N°', 'name', 'username','email', 'phone', 'website'];
  
  ngOnInit(): void {
    this.userService.getAll().subscribe({
      next: (data) => {
        this.dataUsers = data;
        console.log('Data:', this.dataUsers);
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err);
      }
    });
  }

  cargarUsuarios(): void {
    this.userService.getAll().subscribe((res) => {
      this.dataUsers = res;
    });
  }

  eliminarUsuario(user: User): void {
    Swal.fire({
      title: '¿Deses Eliminar el User?',
      text: `User: ${user.username}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, seguro',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
    }).then(result => {
      if (result.isConfirmed) {
        this.userService.delete(user.id).subscribe({
          next: () => {
            Swal.fire('Eliminado Exitosamente', '', 'success');
            this.cargarUsuarios();
          },
          error(err) {
            console.log(err)
          },
        });
      }
    });
  }

  editarUsuario(id: number): void {
    this.router.navigate(['/users/editar', id]);
  }

}
