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

    const days = Math.floor((timeRemaining / 1000 / 60 / 60 / 24) % 24);
    const hours = Math.floor((timeRemaining / 1000 / 60 / 60) % 60);
    const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
    const seconds = Math.floor((timeRemaining / 1000) % 60);

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

    const daysText = createLabel(days, ["день", "дня", "дней"]);
    const hoursText = createLabel(hours, ["час", "часа", "часов"]);
    const minutesText = createLabel(minutes, ["минута", "минуты", "минут"]);

    const previewContainer = document.querySelector(".preview__container");
    const timerHTML = `<div class="timer">
            <p class="timer__title">
              До конца акции:
            </p>
            <ul class="timer__list">
              <li class="timer__item">
                <p class="timer__number">${days}
                  <span class="timer__text">
                    ${daysText}
                  </span>
                </p>
              </li>
              <li class="timer__item">
                <p class="timer__number">${hours}
                  <span class="timer__text">
                    ${hoursText}
                  </span>
                </p>
              </li>
              <li class="timer__item">
                <p class="timer__number">${minutes}
                  <span class="timer__text">
                    ${minutesText}
                  </span>
                </p>
              </li>
            </ul>
          </div>`;
    previewContainer.insertAdjacentHTML("beforeend", timerHTML);

    return { timeRemaining, seconds, minutes, hours, days };
  };

  const start = () => {
    const timer = getTimeRemaining();

    const intervalId = setTimeout(getTimeRemaining, 60000);

    if (timer.timeRemaining <= 0) {
      clearTimeout(intervalId);
      daysText = 0;
      hoursText = 0;
      minutesText = 0;
    }
  };

  start();
};

timer("2025/03/10 17:00");
