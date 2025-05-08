import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Album } from '../Models/album.model';

@Injectable({
  providedIn: 'root'
})
export class AlbumService extends GenericService<Album>{

  constructor(http: HttpClient) { 
    super(http,  'https://jsonplaceholder.typicode.com/albums')
  }
}
