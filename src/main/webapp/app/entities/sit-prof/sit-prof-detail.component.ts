import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISitProf } from 'app/shared/model/sit-prof.model';

@Component({
  selector: 'jhi-sit-prof-detail',
  templateUrl: './sit-prof-detail.component.html'
})
export class SitProfDetailComponent implements OnInit {
  sitProf: ISitProf | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sitProf }) => (this.sitProf = sitProf));
  }

  previousState(): void {
    window.history.back();
  }
}
