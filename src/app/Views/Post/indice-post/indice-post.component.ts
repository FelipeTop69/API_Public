import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { GenericTableComponent } from '../../../General/generic-table/generic-table.component';
import Swal from 'sweetalert2';
import { Post } from '../../../Models/post.model';
import { PostService } from '../../../Services/post.service';

@Component({
  selector: 'app-indice-post',
  imports: [MatCardModule, GenericTableComponent, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './indice-post.component.html',
  styleUrl: './indice-post.component.css'
})
export class IndicePostComponent implements OnInit {
  postService = inject(PostService)
  router = inject(Router)

  dataPosts: Post[] = []
  columnas: string[] = ['N°', 'title', 'body', ];
  
  ngOnInit(): void {
    this.postService.getAll().subscribe({
      next: (data) => {
        this.dataPosts = data;
        console.log('Data:', this.dataPosts);
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err);
      }
    });
  }

  cargarPosts(): void {
    this.postService.getAll().subscribe((res) => {
      this.dataPosts = res;
    });
  }

  eliminarPost(post: Post): void {
    Swal.fire({
      title: '¿Deses Eliminar el Post?',
      text: `Post: ${post.title}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, seguro',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
    }).then(result => {
      if (result.isConfirmed) {
        this.postService.delete(post.id).subscribe({
          next: () => {
            Swal.fire('Eliminado Exitosamente', '', 'success');
            this.cargarPosts();
          },
          error(err) {
            console.log(err)
          },
        });
      }
    });
  }

  editarPost(post: Post): void {
    this.router.navigate([`/post/update/${post.id}`]);
  }
}
