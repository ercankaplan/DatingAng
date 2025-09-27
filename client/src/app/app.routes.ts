import { Routes } from '@angular/router';
import { Home } from '../features/home/home';
import { MemberList } from '../features/members/member-list/member-list';
import { MemberDetail } from '../features/members/member-detail/member-detail';
import { Lists } from '../features/lists/lists';
import { Messages } from '../features/messages/messages';
import { authGuard } from '../core/guards/auth-guard';

export const routes: Routes = [
    { path: '', component: Home, title: 'Home' },
    { path:'',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            { path: 'members', component: MemberList, title: 'Members' },
            { path: 'members/:id', component: MemberDetail, title: 'Member Detail' },
            { path: 'lists', component: Lists, title: 'Lists' },
             { path: 'messages', component: Messages, title: 'Messages' },
        ]
    },
    //{ path: 'members', component: MemberList, title: 'Members' , canActivate: [authGuard]},
    //{ path: 'members/:id', component: MemberDetail, title: 'Member Detail' },
    //{ path: 'lists', component: Lists, title: 'Lists' },
   
    { path: '**', component: Home }, // wildcard route for a 404 page
];
