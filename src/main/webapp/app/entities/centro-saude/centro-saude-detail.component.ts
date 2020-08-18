import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICentroSaude } from 'app/shared/model/centro-saude.model';

@Component({
  selector: 'jhi-centro-saude-detail',
  templateUrl: './centro-saude-detail.component.html'
})
export class CentroSaudeDetailComponent implements OnInit {
  centroSaude: ICentroSaude | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ centroSaude }) => (this.centroSaude = centroSaude));
  }

  previousState(): void {
    window.history.back();
  }
}
