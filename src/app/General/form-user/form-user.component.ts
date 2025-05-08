import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-user',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule,  MatButtonModule, MatIconModule],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.css'
})
export class FormUserComponent implements OnInit{
  @Input() user: any = null;
  @Input() cancelRoute: string = '/';
  @Output() save = new EventEmitter<any>();

  formUser!: FormGroup;

  private fb = inject(FormBuilder);
  private router = inject(Router);

  ngOnInit(): void {
    this.formUser = this.fb.group({
      name: ['', Validators.required],
      username: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      website: ['', [Validators.required]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user) {
      const formattedUser = {
        ...this.user,
        phone: this.user.phone.replace(/[^0-9]/g, '')
      };
      this.formUser?.patchValue(formattedUser);

      // Enviar solo ciertos datos
      this.formUser.patchValue({
        phone: this.user.phone.replace(/[^0-9]/g, '')
      });
    }
  }

  onSubmit() {

    if (this.formUser.valid) {
      const formValue = { 
        ...this.user, 
        ...this.formUser.value 
      };
      this.save.emit(formValue);
    }
  }

  onCancel() {
    this.router.navigate([this.cancelRoute]);
  }
}
