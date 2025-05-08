import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Album } from '../../../Models/album.model';
import { AlbumService } from '../../../Services/album.service';
import { FormAlbumComponent } from "../../../General/form-album/form-album.component";

@Component({
  selector: 'app-create-album',
  imports: [FormAlbumComponent],
  templateUrl: './create-album.component.html',
  styleUrl: './create-album.component.css'
})
export class CreateAlbumComponent {
  private albumService = inject(AlbumService);
  private router = inject(Router);

  handleSaveAlbum(createAlbum: Album) {
    this.albumService.create(createAlbum).subscribe({
      next: () => {
        Swal.fire(`${createAlbum.title} Creado Exitosamente`, '', 'success');
        this.router.navigate(['/album']);
      },
      error: (err) => {
        console.error('Error al crear el usuario:', err);
      }
    });
  }
}
