import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Demografia2TestModule } from '../../../test.module';
import { HabitComponent } from 'app/entities/habit/habit.component';
import { HabitService } from 'app/entities/habit/habit.service';
import { Habit } from 'app/shared/model/habit.model';

describe('Component Tests', () => {
  describe('Habit Management Component', () => {
    let comp: HabitComponent;
    let fixture: ComponentFixture<HabitComponent>;
    let service: HabitService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Demografia2TestModule],
        declarations: [HabitComponent]
      })
        .overrideTemplate(HabitComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HabitComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HabitService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Habit(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.habits && comp.habits[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
