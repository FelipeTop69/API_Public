import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { GenericTableComponent } from '../../../General/generic-table/generic-table.component';
import Swal from 'sweetalert2';
import { AlbumService } from '../../../Services/album.service';
import { Album } from '../../../Models/album.model';

@Component({
  selector: 'app-indice-album',
  imports: [MatCardModule, GenericTableComponent, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './indice-album.component.html',
  styleUrl: './indice-album.component.css'
})
export class IndiceAlbumComponent implements OnInit {
  albumService = inject(AlbumService)
  router = inject(Router)

  dataAlbums: Album[] = []
  columnas: string[] = ['N°', 'title', ];
  
  ngOnInit(): void {
    this.albumService.getAll().subscribe({
      next: (data) => {
        this.dataAlbums = data;
        console.log('Data:', this.dataAlbums);
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err);
      }
    });
  }

  cargarAlbums(): void {
    this.albumService.getAll().subscribe((res) => {
      this.dataAlbums = res;  
    });
  }

  eliminarAlbum(album: Album): void {
    Swal.fire({
      title: '¿Deses Eliminar el Album?',
      text: `Album: ${album.title}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, seguro',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
    }).then(result => {
      if (result.isConfirmed) {
        this.albumService.delete(album.id).subscribe({
          next: () => {
            Swal.fire('Eliminado Exitosamente', '', 'success');
            this.cargarAlbums();
          },
          error(err) {
            console.log(err)
          },
        });
      }
    });
  }

  editarAlbum(album: Album): void {
    this.router.navigate([`/album/update/${album.id}`]);
  }
}
