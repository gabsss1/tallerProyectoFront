import { Routes } from "@angular/router";
import { IndexComponent } from "./components/index/index.component";



export const mecanicoRoutes: Routes = [
    {
        path: 'mecanico/index',
        component: IndexComponent,
        loadChildren: () => import('./mecanico.module').then( m => m.MecanicoModule)
    }
];