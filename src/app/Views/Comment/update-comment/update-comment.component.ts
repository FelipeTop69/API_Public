import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CommentModel } from '../../../Models/comment.model';
import { CommentService } from '../../../Services/comment.service';
import { FormCommentComponent } from "../../../General/form-comment/form-comment.component";

@Component({
  selector: 'app-update-comment',
  imports: [FormCommentComponent],
  templateUrl: './update-comment.component.html',
  styleUrl: './update-comment.component.css'
})
export class UpdateCommentComponent implements OnInit {
  private commentService = inject(CommentService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  
  comment: CommentModel | null = null;

  ngOnInit(): void {
    // Obtener el id del usuario desde la URL
    const commentId = Number(this.route.snapshot.paramMap.get('id'));

    this.commentService.getById(commentId).subscribe({
      next: (data) => {
        this.comment = data; 
      },
      error: (err) => {
        console.error('Error al obtener usuario:', err);
      }
    });
  }

  
  handleSaveComment(updatedComment: CommentModel) {
    this.commentService.update(updatedComment.id,  updatedComment).subscribe({
      next: () => {
        Swal.fire(`${updatedComment.name} Actualizado Exitosamente`, '', 'success');
        
        this.router.navigate(['/comment']);
      },
      error: (err) => {
        console.error('Error al actualizar el usuario:', err);
      }
    });
  }
}
