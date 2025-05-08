import { Routes } from '@angular/router';
import { IndiceUserComponent } from './Views/User/indice-user/indice-user.component';
import { CreateUserComponent } from './Views/User/create-user/create-user.component';
import { UpdateUserComponent } from './Views/User/update-user/update-user.component';
import { CreatePostComponent } from './Views/Post/create-post/create-post.component';
import { IndicePostComponent } from './Views/Post/indice-post/indice-post.component';
import { UpdatePostComponent } from './Views/Post/update-post/update-post.component';
import { CreateAlbumComponent } from './Views/Album/create-album/create-album.component';
import { IndiceAlbumComponent } from './Views/Album/indice-album/indice-album.component';
import { UpdateAlbumComponent } from './Views/Album/update-album/update-album.component';
import { CreateCommentComponent } from './Views/Comment/create-comment/create-comment.component';
import { IndiceCommentComponent } from './Views/Comment/indice-comment/indice-comment.component';
import { UpdateCommentComponent } from './Views/Comment/update-comment/update-comment.component';


export const routes: Routes = [
    {path: 'user', component: IndiceUserComponent},
    {path: 'user/create', component: CreateUserComponent},
    {path: 'user/update/:id', component: UpdateUserComponent},

    {path: 'post', component: IndicePostComponent},
    {path: 'post/create', component: CreatePostComponent},
    {path: 'post/update/:id', component: UpdatePostComponent},

    {path: 'album', component: IndiceAlbumComponent},
    {path: 'album/create', component: CreateAlbumComponent},
    {path: 'album/update/:id', component: UpdateAlbumComponent},

    {path: 'comment', component: IndiceCommentComponent},
    {path: 'comment/create', component: CreateCommentComponent},
    {path: 'comment/update/:id', component: UpdateCommentComponent}
];
