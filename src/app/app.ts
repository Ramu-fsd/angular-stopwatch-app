import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Stopwatch } from './features/stopwatch/stopwatch';
@Component({ selector: 'app-root', standalone: true, imports: [Stopwatch], templateUrl: './app.html', styleUrl: './app.css', changeDetection: ChangeDetectionStrategy.OnPush })
export class App {}
