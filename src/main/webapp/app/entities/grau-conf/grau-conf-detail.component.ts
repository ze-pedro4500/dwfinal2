import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGrauConf } from 'app/shared/model/grau-conf.model';

@Component({
  selector: 'jhi-grau-conf-detail',
  templateUrl: './grau-conf-detail.component.html'
})
export class GrauConfDetailComponent implements OnInit {
  grauConf: IGrauConf | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ grauConf }) => (this.grauConf = grauConf));
  }

  previousState(): void {
    window.history.back();
  }
}
