import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Budget, ModuleType, Zone } from '../models/budget';
import { BudgetService } from '../services/budget.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-budget-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,],
  templateUrl: './budget-form.component.html',
  styleUrl: './budget-form.component.css',
})
export class BudgetFormComponent implements OnInit {
  budgetForm: FormGroup;
  moduleTypes: ModuleType[] = [];

  constructor(
    private fb: FormBuilder,
    private budgetService: BudgetService,
    private router: Router
  ) {
    this.budgetForm = this.fb.group({
      date: ['', [Validators.required]],
      client: ['', [Validators.required]],
      modules: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.addModule();
    this.loadModuleTypes();
  }

  loadModuleTypes(): void {
    this.budgetService.getModuleTypes().subscribe((types) => {
      this.moduleTypes = types;
    });
  }

  get modules(): FormArray {
    return this.budgetForm.get('modules') as FormArray;
  }

  addModule(): void {
    if (this.modules.length < 5) {
      const moduleGroup = this.fb.group({
        type: ['', Validators.required],
        price: [{ value: '', disabled: true }],
        slots: [{ value: '', disabled: true }],
        zone: ['', Validators.required],
      });
      this.modules.push(moduleGroup);

      moduleGroup.get('type')?.valueChanges.subscribe((selectedType) => {
        const selectedModule = this.moduleTypes.find(
          (module) => module.name === selectedType
        );
        if (selectedModule) {
          moduleGroup.get('price')?.setValue(selectedModule.price.toString());
          moduleGroup.get('slots')?.setValue(selectedModule.slots.toString());
        }
      });
    }
  }

  removeModule(index: number): void {
    this.modules.removeAt(index);
  }

  save(): void {
    if (this.budgetForm.valid && this.modules.length >= 2) {
      const budget: Budget = this.budgetForm.getRawValue();
      this.budgetService.createBudget(budget).subscribe({
        next: () => {
          console.log('Cotización guardada:', budget);
          this.goBack();
        },
        error: (error) => console.error('Error al guardar la cotización', error),
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/listado']);
  }
}