import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAces } from 'app/shared/model/aces.model';

@Component({
  selector: 'jhi-aces-detail',
  templateUrl: './aces-detail.component.html'
})
export class AcesDetailComponent implements OnInit {
  aces: IAces | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ aces }) => (this.aces = aces));
  }

  previousState(): void {
    window.history.back();
  }
}
