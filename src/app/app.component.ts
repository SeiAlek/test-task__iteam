import { Component } from '@angular/core';
import { interval, timer } from 'rxjs';

type BtnText = 'Start' | 'Pause' | 'Continue';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Timer';
  btnText: BtnText = 'Start';
  timerData = 0;
  formattedTime = '00:00:00';
  isRun = false;
  readyToWait = false;
  myTimer$: any;

  formatTime(ms: number): string {
    const sec = Math.trunc(ms / 1000);
    const hours = Math.trunc(sec / 3600);
    const minutes = Math.trunc((sec - (hours * 3600)) / 60);
    const seconds = sec - (hours * 3600) - (minutes * 60);

    return `${this.addZero(hours)}:${this.addZero(minutes)}:${this.addZero(seconds)}`;
  }

  addZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  handleStart(): void {
    if (this.isRun) {
      this.myTimer$.unsubscribe();
      this.btnText = 'Continue';
      this.isRun = false;
      return;
    }

    this.myTimer$ = interval(1000).subscribe(value => {
      this.timerData += 1000;
      this.formattedTime = this.formatTime(this.timerData);
    });

    this.isRun = true;
    this.btnText = 'Pause';
  }

  handlePause(): void {
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
    this.myTimer$.unsubscribe();
  }

  handleReset(): void {
    if (!this.myTimer$) {
      return;
    }

    this.timerData = 0;
    this.formattedTime = '00:00:00';
    this.isRun = false;
    this.btnText = 'Start';
    this.myTimer$.unsubscribe();
  }
}

