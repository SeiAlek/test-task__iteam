import { Component } from '@angular/core';
import { interval, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Timer';
  timerData = 0;
  isRun = false;

  btnText: 'Start' | 'Pause' | 'Continue' = 'Start';
  myTimer: any;
  readyToWait = false;

  handleStart() {
    if (this.isRun) {
      this.myTimer.unsubscribe();
      this.btnText = 'Continue';
      this.isRun = false;
      return;
    }

    this.myTimer = interval(1000).subscribe(value => {
      this.timerData += 1000;
    });

    this.isRun = true;
    this.btnText = 'Pause';
  }

  handlePause() {
    if (!this.isRun) {
      return;
    }

    if (!this.readyToWait) {
      this.readyToWait = true;
      timer(300).subscribe(() => {
        this.readyToWait = false;
      });

      return;
    }

    this.btnText = 'Continue';
    this.isRun = false;
    this.myTimer.unsubscribe();
  }

  handleReset() {
    if (!this.myTimer) {
      return;
    }

    this.timerData = 0;
    this.isRun = false;
    this.btnText = 'Start';
    this.myTimer.unsubscribe();
  }
}

