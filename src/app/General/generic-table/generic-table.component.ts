import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-generic-table',
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.css'
})
export class GenericTableComponent implements OnChanges {
  @Input() data: any[] = [];
  @Input() columns: string[] = [];

  @Output() onDelete = new EventEmitter<any>();
  @Output() onEdit = new EventEmitter<any>();

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];

  ngOnChanges(): void {
    this.dataSource.data = this.data || [];
    this.displayedColumns = [...this.columns, 'actions'];
  }

  getValue(item: any, path: string): any {
    return path.split('.').reduce((acc, key) => acc?.[key], item);
  }

  deleteItem(element: any) {
    this.onDelete.emit(element); 
  }
  
  editItem(element: any) {
    this.onEdit.emit(element); 
  }


}
