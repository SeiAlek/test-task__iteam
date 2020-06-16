
# Angular Counter

[DEMO LINK](https://seialek.github.io/test-task__iteam/)

## Поставленная задача
**Angular 2+**

Реализовать таймер, который подсчитывает время в формате «HH: MM: SS»

Таймер должен иметь следующие кнопки:

* «Start / Stop» - запуск / остановка отсчета времени,

* «Wait» - с последующим быстрым нажатием (время между нажатиями не более 300 мс) таймер должен прекратить отсчет времени,

* «Reset» - сброс таймера на 0

Требование: используйте Observables в коде.


## Description

**Button: Start (Pause, Continue)**

The first click starts the counter, after which the button text changed to **Pause**. If you click it again, the countdown will be paused (the button text will be changed to **Continue**), and it can be resumed with the next click.

**Button Wait**

When the countdown does not go, the button is disabled. When a button is active, a double click (a pause between clicks of no more than 300 milliseconds) pauses the countdown (just like the first button).

**Button Reset**

The button is disabled while the timer is zero. When the timer is greater than zero, it stops and resets the timer.
