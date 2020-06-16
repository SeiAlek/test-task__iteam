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
  isStarted = false;

  btnText: 'Start' | 'Pause' | 'Continue' = 'Start';
  myTimer: any;
  readyToWait = false;

  handleStart() {
    if (this.isStarted) {
      this.myTimer.unsubscribe();
      this.btnText = 'Continue';
      this.isStarted = false;
      return;
    }

    this.myTimer = interval(1000).subscribe(value => {
      this.timerData += 1000;
    });

    this.isStarted = true;
    this.btnText = 'Pause';
  }

  handlePause() {
    if (!this.isStarted) {
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
    this.isStarted = false;
    this.myTimer.unsubscribe();
  }

  handleReset() {
    if (!this.myTimer) {
      return;
    }

    this.timerData = 0;
    this.isStarted = false;
    this.btnText = 'Start';
    this.myTimer.unsubscribe();
  }
}

