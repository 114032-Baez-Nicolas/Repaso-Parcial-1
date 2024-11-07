import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Budget, ModuleType } from '../models/budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getModuleTypes(): Observable<ModuleType[]> {
    return this.http.get<ModuleType[]>(`${this.apiUrl}/module-types`);
  }

  getBudgets(): Observable<Budget[]> {
    return this.http.get<Budget[]>(`${this.apiUrl}/budgets`);
  }

  getBudgetById(id: string): Observable<Budget> {
    return this.http.get<Budget>(`${this.apiUrl}/budgets/${id}`);
  }
  

  createBudget(budget: Budget): Observable<Budget> {
    return this.http.post<Budget>(`${this.apiUrl}/budgets`, budget);
  }
  

  updateBudget(budget: Budget): Observable<Budget> {
    return this.http.put<Budget>(`${this.apiUrl}/budgets/${budget.id}`, budget);
  }

  isClientUnique(clientName: string): Observable<boolean> {
    return this.getBudgets().pipe(
      map(budgets => !budgets.some(budget => budget.client === clientName))
    );
  }
}