import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVitalidade } from 'app/shared/model/vitalidade.model';

@Component({
  selector: 'jhi-vitalidade-detail',
  templateUrl: './vitalidade-detail.component.html'
})
export class VitalidadeDetailComponent implements OnInit {
  vitalidade: IVitalidade | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ vitalidade }) => (this.vitalidade = vitalidade));
  }

  previousState(): void {
    window.history.back();
  }
}
