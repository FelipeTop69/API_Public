import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { GenericTableComponent } from '../../../General/generic-table/generic-table.component';
import Swal from 'sweetalert2';
import { CommentService } from '../../../Services/comment.service';
import { CommentModel } from '../../../Models/comment.model';



@Component({
  selector: 'app-indice-comment',
  imports: [MatCardModule, GenericTableComponent, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './indice-comment.component.html',
  styleUrl: './indice-comment.component.css'
})
export class IndiceCommentComponent implements OnInit {
  commentService = inject(CommentService)
  router = inject(Router)

  dataComments: CommentModel[] = []
  columnas: string[] = ['N°', 'name', 'email', 'body'];
  
  ngOnInit(): void {
    this.commentService.getAll().subscribe({
      next: (data) => {
        this.dataComments = data;
        console.log('Data:', this.dataComments);
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err);
      }
    });
  }

  cargarComments(): void {
    this.commentService.getAll().subscribe((res) => {
      this.dataComments = res;
    });
  }

  eliminarComment(comment: CommentModel): void {
    Swal.fire({
      title: '¿Deses Eliminar el Comment?',
      text: `Comment: ${comment.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, seguro',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
    }).then(result => {
      if (result.isConfirmed) {
        this.commentService.delete(comment.id).subscribe({
          next: () => {
            Swal.fire('Eliminado Exitosamente', '', 'success');
            this.cargarComments();
          },
          error(err) {
            console.log(err)
          },
        });
      }
    });
  }

  editarComment(comment: CommentModel): void {
    this.router.navigate([`/comment/update/${comment.id}`]);
  }
}
