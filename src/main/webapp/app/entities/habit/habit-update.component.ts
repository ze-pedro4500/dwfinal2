import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IHabit, Habit } from 'app/shared/model/habit.model';
import { HabitService } from './habit.service';

@Component({
  selector: 'jhi-habit-update',
  templateUrl: './habit-update.component.html'
})
export class HabitUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nome: []
  });

  constructor(protected habitService: HabitService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ habit }) => {
      this.updateForm(habit);
    });
  }

  updateForm(habit: IHabit): void {
    this.editForm.patchValue({
      id: habit.id,
      nome: habit.nome
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const habit = this.createFromForm();
    if (habit.id !== undefined) {
      this.subscribeToSaveResponse(this.habitService.update(habit));
    } else {
      this.subscribeToSaveResponse(this.habitService.create(habit));
    }
  }

  private createFromForm(): IHabit {
    return {
      ...new Habit(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHabit>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
