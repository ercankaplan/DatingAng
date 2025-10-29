import { Routes } from '@angular/router';
import { Home } from '../features/home/home';
import { MemberList } from '../features/members/member-list/member-list';
import { MemberDetail } from '../features/members/member-detail/member-detail';
import { Lists } from '../features/lists/lists';
import { Messages } from '../features/messages/messages';
import { authGuard } from '../core/guards/auth-guard';
import { TestErrors } from '../features/test-errors/test-errors';
import { NotFound } from '../shared/errors/not-found/not-found';
import { ServerError } from '../shared/errors/server-error/server-error';
import { MemberMessages } from '../features/members/member-messages/member-messages';
import { MemberPhotos } from '../features/members/member-photos/member-photos';
import { MemberProfile } from '../features/members/member-profile/member-profile';
import { memberResolver } from '../features/members/member-resolver';

export const routes: Routes = [
    { path: '', component: Home, title: 'Home' },
    { path:'',
        runGuardsAndResolvers: 'always',
        //loadChildren:() => LazyLoadingModule,
        canActivate: [authGuard],
        children: [
            { path: 'members', component: MemberList, title: 'Members' },
            { path: 'members/:id', 
                component: MemberDetail, 
                title: 'Member Detail',
                resolve: { member: memberResolver },
                runGuardsAndResolvers:'always',
                children: [
                       // Define child routes here if needed
                       {path:'', redirectTo:'profile', pathMatch:'full'},
                       { path: 'profile', component: MemberProfile, title: 'Profile' },
                       { path: 'photos', component: MemberPhotos, title: 'Photos' },
                       { path: 'messages', component: MemberMessages, title: 'Messages' }

                ]
            },
            { path: 'lists', component: Lists, title: 'Lists' },
             { path: 'messages', component: Messages, title: 'Messages' },
        ]
    },
    { path: 'errors', component: TestErrors, title: 'Test Errors' },
    { path: 'server-error', component: ServerError, title: 'Server Error' },
    //{ path: 'members', component: MemberList, title: 'Members' , canActivate: [authGuard]},
    //{ path: 'members/:id', component: MemberDetail, title: 'Member Detail' },
    //{ path: 'lists', component: Lists, title: 'Lists' },
   
    { path: '**', component: NotFound }, // wildcard route for a 404 page
];
