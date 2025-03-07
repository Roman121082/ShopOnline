"use strict";
document.addEventListener("click", (event) => {
  if (event.target.matches("button")) {
    event.target.focus();
  }
});

const timer = (deadLine) => {
  const getTimeRemaining = () => {
    const dateStop = new Date(deadLine).getTime();
    const dateNow = Date.now();
    const timeRemaining = dateStop - dateNow;

    const daysText = document.querySelector('[data-timer="days"]');
    const hoursText = document.querySelector('[data-timer="hours"]');
    const minutesText = document.querySelector('[data-timer="minutes"]');
    let timerTextDays = document.querySelector(".timer__text-days");
    let timerTextHours = document.querySelector(".timer__text-hours");
    let timerTextMinutes = document.querySelector(".timer__text-minutes");

    const days = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);
    const hours = Math.floor((timeRemaining / 1000 / 60 / 60) % 60)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((timeRemaining / 1000 / 60) % 60)
      .toString()
      .padStart(2, "0");
    // seconds = Math.floor((timeRemaining / 1000) % 60);

    daysText.textContent = days;
    hoursText.textContent = hours;
    minutesText.textContent = minutes;

    function createLabel(number, titles) {
      const cases = [2, 0, 1, 1, 1, 2];
      return `${
        titles[
          number % 100 > 4 && number % 100 < 20
            ? 2
            : cases[number % 10 < 5 ? number % 10 : 5]
        ]
      }`;
    }

    timerTextDays.textContent = createLabel(days, ["день", "дня", "дней"]);
    timerTextHours.textContent = createLabel(hours, ["час", "часа", "часов"]);
    timerTextMinutes.textContent = createLabel(minutes, [
      "минута",
      "минуты",
      "минут",
    ]);

    const intervalId = setTimeout(getTimeRemaining, 60000);
    return { timeRemaining, minutes, hours, days };
  };

  const start = () => {
    const timer = getTimeRemaining();

    if (timer.timeRemaining <= 0) {
      clearTimeout(intervalId);
      days.textContent = 0;
      hours.textContent = 0;
      minutes.textContent = 0;
    }
  };

  start();
};

timer("2027/03/10 17:00");
