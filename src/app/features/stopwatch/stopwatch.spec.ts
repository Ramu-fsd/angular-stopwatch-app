import { TestBed } from '@angular/core/testing';
import { Stopwatch } from './stopwatch';

describe('Stopwatch', () => {
  let component: Stopwatch;
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [Stopwatch] });
    component = TestBed.createComponent(Stopwatch).componentInstance;
  });
  afterEach(() => component.pause());
  it('starts paused at zero', () => {
    expect(component.elapsedMs()).toBe(0);
    expect(component.running()).toBeFalse();
    expect(component.displayTime).toBe('00:00.00');
  });
  it('records a lap while running', () => {
    component.start();
    component.elapsedMs.set(1250);
    component.recordLap();
    expect(component.laps()).toEqual([1250]);
  });
  it('resets elapsed time and laps', () => {
    component.elapsedMs.set(5000);
    component.laps.set([1000]);
    component.reset();
    expect(component.elapsedMs()).toBe(0);
    expect(component.laps()).toEqual([]);
  });
});
