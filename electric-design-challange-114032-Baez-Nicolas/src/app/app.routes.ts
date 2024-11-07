import { RouterModule, Routes } from '@angular/router';
import { BudgetListComponent } from './budget-list/budget-list.component';
import { BudgetFormComponent } from './budget-form/budget-form.component';
import { NgModule } from '@angular/core';
import { BudgetViewComponent } from './budget-view/budget-view.component';

export const appRoutes: Routes = [
  { path: 'listado', component: BudgetListComponent },
  { path: 'nueva-cotizacion', component: BudgetFormComponent },
  { path: 'budget-view/:id', component: BudgetViewComponent },
  { path: '', redirectTo: '/listado', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
