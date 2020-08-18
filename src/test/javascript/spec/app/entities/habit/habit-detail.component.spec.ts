import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Demografia2TestModule } from '../../../test.module';
import { HabitDetailComponent } from 'app/entities/habit/habit-detail.component';
import { Habit } from 'app/shared/model/habit.model';

describe('Component Tests', () => {
  describe('Habit Management Detail Component', () => {
    let comp: HabitDetailComponent;
    let fixture: ComponentFixture<HabitDetailComponent>;
    const route = ({ data: of({ habit: new Habit(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Demografia2TestModule],
        declarations: [HabitDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(HabitDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(HabitDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load habit on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.habit).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
