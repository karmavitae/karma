import { Route } from "@angular/router";
import { KvaComponent } from "./kva/kva.component";
import { KvaUsersComponent } from "./kva-users/kva-users.component";

export const KvaRoutes: Route[] = [
    { path: 'users', component: KvaUsersComponent},
    { path: '', component: KvaComponent},
]