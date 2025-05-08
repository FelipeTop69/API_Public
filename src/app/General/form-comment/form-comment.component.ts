import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-comment',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule,  MatButtonModule, MatIconModule],
  templateUrl: './form-comment.component.html',
  styleUrl: './form-comment.component.css'
})
export class FormCommentComponent  implements OnInit {
  @Input() comment: any = null;
  @Input() cancelRoute: string = '/';
  @Output() save = new EventEmitter<any>();

  formComment!: FormGroup;

  private fb = inject(FormBuilder);
  private router = inject(Router);

  ngOnInit(): void {
    this.formComment = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required,  Validators.email]],
      body: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['comment'] && this.comment) {
      this.formComment?.patchValue(this.comment);
    }
  }

  onSubmit() {

    if (this.formComment.valid) {
      const formValue = { 
        ...this.comment, 
        ...this.formComment.value 
      };
      this.save.emit(formValue);
    }
  }

  onCancel() {
    this.router.navigate([this.cancelRoute]);
  }
}