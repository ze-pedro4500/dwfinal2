import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDoenteDiagnosticoSocial } from 'app/shared/model/doente-diagnostico-social.model';

@Component({
  selector: 'jhi-doente-diagnostico-social-detail',
  templateUrl: './doente-diagnostico-social-detail.component.html'
})
export class DoenteDiagnosticoSocialDetailComponent implements OnInit {
  doenteDiagnosticoSocial: IDoenteDiagnosticoSocial | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ doenteDiagnosticoSocial }) => (this.doenteDiagnosticoSocial = doenteDiagnosticoSocial));
  }

  previousState(): void {
    window.history.back();
  }
}
