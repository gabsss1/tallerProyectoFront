import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { globalRoutes } from "./modules/global/global.routing";
import { mecanicoRoutes } from "./modules/mecanico/mecanico.routing";

@NgModule({
    imports: [RouterModule.forChild([
        ...globalRoutes,
        ...mecanicoRoutes,
    ])],
    exports: [RouterModule]
})
export class RutasModule { }