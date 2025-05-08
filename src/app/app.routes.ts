import { Routes } from '@angular/router';
import { IndiceUserComponent } from './Views/User/indice-user/indice-user.component';
import { CreateUserComponent } from './Views/User/create-user/create-user.component';
import { UpdateUserComponent } from './Views/User/update-user/update-user.component';


export const routes: Routes = [
    {path: 'user', component: IndiceUserComponent},
    {path: 'user/create', component: CreateUserComponent},
    {path: 'user/update/:id', component: UpdateUserComponent}
];
