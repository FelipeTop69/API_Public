import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Album } from '../../../Models/album.model';
import { AlbumService } from '../../../Services/album.service';
import { FormAlbumComponent } from "../../../General/form-album/form-album.component";

@Component({
  selector: 'app-update-album',
  imports: [FormAlbumComponent],
  templateUrl: './update-album.component.html',
  styleUrl: './update-album.component.css'
})
export class UpdateAlbumComponent implements OnInit {
  private albumService = inject(AlbumService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  
  album: Album | null = null;

  ngOnInit(): void {
    // Obtener el id del usuario desde la URL
    const albumId = Number(this.route.snapshot.paramMap.get('id'));

    this.albumService.getById(albumId).subscribe({
      next: (data) => {
        this.album = data; 
      },
      error: (err) => {
        console.error('Error al obtener usuario:', err);
      }
    });
  }

  
  handleSaveAlbum(updatedAlbum: Album) {
    this.albumService.update(updatedAlbum.id,updatedAlbum).subscribe({
      next: () => {
        Swal.fire(`${updatedAlbum.title} Actualizado Exitosamente`, '', 'success');
        
        this.router.navigate(['/album']);
      },
      error: (err) => {
        console.error('Error al actualizar el usuario:', err);
      }
    });
  }
}
