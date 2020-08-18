import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHorarioDoente } from 'app/shared/model/horario-doente.model';

@Component({
  selector: 'jhi-horario-doente-detail',
  templateUrl: './horario-doente-detail.component.html'
})
export class HorarioDoenteDetailComponent implements OnInit {
  horarioDoente: IHorarioDoente | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ horarioDoente }) => (this.horarioDoente = horarioDoente));
  }

  previousState(): void {
    window.history.back();
  }
}
