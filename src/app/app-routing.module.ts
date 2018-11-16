import { NgModule } from "@angular/core";
import { RouterModule, Routes, PreloadAllModules } from "@angular/router";

import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { HomeComponent } from "./core/home/home.component";


const appRoutes : Routes = [
    // only redirect if full path is empty => pathMatch: 'full'
    // { path: '', redirectTo: '/recipes', pathMatch: 'full'},

    { path: '', component: HomeComponent},

    // recipes is lazy loaded with path_to_the_file + #ClassName
    { path: 'recipes', loadChildren: './recipes/recipe.module#RecipesModule'},
    
    { path: 'shopping-list', component: ShoppingListComponent}   
];



@NgModule({
    // for lazy loaded modules (npr recipe.module) unapred load-uj sve - nakon sto se app ucita
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}