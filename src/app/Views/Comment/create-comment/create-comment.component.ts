import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommentModel } from '../../../Models/comment.model';
import { CommentService } from '../../../Services/comment.service';
import { FormCommentComponent } from "../../../General/form-comment/form-comment.component";

@Component({
  selector: 'app-create-comment',
  imports: [FormCommentComponent],
  templateUrl: './create-comment.component.html',
  styleUrl: './create-comment.component.css'
})
export class CreateCommentComponent {
  private commentService = inject(CommentService);
  private router = inject(Router);

  handleSaveComment(createComment: CommentModel) {
    this.commentService.create(createComment).subscribe({
      next: () => {
        Swal.fire(`${createComment.name} Creado Exitosamente`, '', 'success');
        this.router.navigate(['/comment']);
      },
      error: (err) => {
        console.error('Error al crear el usuario:', err);
      }
    });
  }
}
