import { Routes } from "@angular/router";
import { LayoutHeroesComponent } from "./components/layout-heroes/layout-heroes.component";

const routes: Routes = [
    { path: 'heroes', component: LayoutHeroesComponent },
    { path: '', redirectTo: 'heroes', pathMatch: 'full' },
  ];