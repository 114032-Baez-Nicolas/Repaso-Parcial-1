import { Component, OnInit, Pipe } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BudgetService } from '../services/budget.service';
import { Budget } from '../models/budget';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.css',
})
export class BudgetListComponent implements OnInit {
  budgets: Budget[] = [];

  constructor(private budgetService: BudgetService) { }

  ngOnInit(): void {
    this.budgetService.getBudgets().subscribe((data: Budget[]) => {
      this.budgets = data;
    });
  }

  getTotalModules(budget: Budget): number {
    return budget.modules?.reduce((total, module) => total + (module.quantity || 1), 0) || 0;
  }
}