import { Component } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Timer';
  timerData = 0;
  isStarted = false;

  btnText: 'Start' | 'Pause' | 'Continue' = 'Start';
  timer;

  handleStart() {
    if (this.isStarted) {
      this.timer.unsubscribe();
      this.btnText = 'Continue';
      this.isStarted = false;
      return;
    }

    this.timer = interval(1000).subscribe(value => {
      this.timerData += 1000;
      console.log(value);
    });

    this.isStarted = true;
    this.btnText = 'Pause';
  }

  handlePause() {
    if (!this.isStarted) {
      return;
    }

    this.btnText = 'Continue';
    this.isStarted = false;
    this.timer.unsubscribe();
  }

  handleReset() {
    if (!this.timer) {
      return;
    }

    this.timerData = 0;
    this.isStarted = false;
    this.btnText = 'Start';
    this.timer.unsubscribe();
  }
}

