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
  formattedTime = '00:00:00';
  isRun = false;

  btnText: 'Start' | 'Pause' | 'Continue' = 'Start';
  myTimer: any;
  readyToWait = false;

  formatTime(ms) {
    const sec = Math.trunc(ms / 1000);
    const hours = Math.trunc(sec / 3600);
    const minutes = Math.trunc((sec - (hours * 3600)) / 60);
    const seconds = sec - (hours * 3600) - (minutes * 60);

    return `${this.addZero(hours)}:${this.addZero(minutes)}:${this.addZero(seconds)}`;
  }

  addZero(num) {
    return num < 10 ? `0${num}` : num;
  }

  handleStart() {
    if (this.isRun) {
      this.myTimer.unsubscribe();
      this.btnText = 'Continue';
      this.isRun = false;
      return;
    }

    this.myTimer = interval(1000).subscribe(value => {
      this.timerData += 1000;
      this.formattedTime = this.formatTime(this.timerData);
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
    this.formattedTime = '00:00:00';
    this.isRun = false;
    this.btnText = 'Start';
    this.myTimer.unsubscribe();
  }
}

