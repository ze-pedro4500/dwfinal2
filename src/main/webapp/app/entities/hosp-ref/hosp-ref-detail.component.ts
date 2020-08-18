import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHospRef } from 'app/shared/model/hosp-ref.model';

@Component({
  selector: 'jhi-hosp-ref-detail',
  templateUrl: './hosp-ref-detail.component.html'
})
export class HospRefDetailComponent implements OnInit {
  hospRef: IHospRef | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ hospRef }) => (this.hospRef = hospRef));
  }

  previousState(): void {
    window.history.back();
  }
}
