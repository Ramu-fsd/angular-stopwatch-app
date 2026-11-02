import { ChangeDetectionStrategy, Component, OnDestroy, signal } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({ selector: 'app-stopwatch', standalone: true, templateUrl: './stopwatch.html', styleUrl: './stopwatch.css', changeDetection: ChangeDetectionStrategy.OnPush })
export class Stopwatch implements OnDestroy {
  readonly elapsedMs = signal(0);
  readonly running = signal(false);
  readonly laps = signal<number[]>([]);
  private timer?: Subscription;

  get displayTime(): string {
    const totalCentiseconds = Math.floor(this.elapsedMs() / 10);
    const minutes = Math.floor(totalCentiseconds / 6000);
    const seconds = Math.floor((totalCentiseconds % 6000) / 100);
    const centiseconds = totalCentiseconds % 100;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`;
  }

  start(): void {
    if (this.running()) return;
    this.running.set(true);
    this.timer = interval(10).subscribe(() => this.elapsedMs.update(value => value + 10));
  }
  pause(): void { this.timer?.unsubscribe(); this.timer = undefined; this.running.set(false); }
  reset(): void { this.pause(); this.elapsedMs.set(0); this.laps.set([]); }
  recordLap(): void { if (this.running()) this.laps.update(values => [this.elapsedMs(), ...values]); }
  formatLap(value: number): string {
    const cs = Math.floor(value / 10);
    return `${String(Math.floor(cs / 6000)).padStart(2, '0')}:${String(Math.floor((cs % 6000) / 100)).padStart(2, '0')}.${String(cs % 100).padStart(2, '0')}`;
  }
  ngOnDestroy(): void { this.timer?.unsubscribe(); }
}
