import { Component, OnInit } from '@angular/core';
import { Budget } from '../models/budget';
import { BudgetService } from '../services/budget.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-budget-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './budget-view.component.html',
  styleUrls: ['./budget-view.component.css'],
})
export class BudgetViewComponent implements OnInit {
  budget: Budget | null = null;

  constructor(
    private route: ActivatedRoute,
    private budgetService: BudgetService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.budgetService.getBudgetById(id).subscribe((budget) => {
      this.budget = budget;
    });
  }

  calculateTotal(): number {
    if (!this.budget || !this.budget.modules) {
      return 0;
    }
    return this.budget.modules.reduce((total, module) => total + Number(module.price), 0);
  }

  calculateRequiredBoxes(): number {
    if (!this.budget || !this.budget.modules) {
      return 0;
    }
    const totalSlots = this.budget.modules.reduce((sum, module) => sum + module.slots, 0);
    return Math.ceil(totalSlots / 3);
  }
}