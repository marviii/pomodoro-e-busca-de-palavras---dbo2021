let interval;
const timer = document.querySelector('#timer');
const alarme = new Audio('zelda alarm.mp3');
let = min = 25;
let = seg = 0;
let = minP = 5;
let = segP = 0;

function relogio() {
  if ((min > 0) || (seg > 0)) {
    if (seg === 0) {
      seg = 59;
      min -= 1;
    } else {
      seg -= 1;
    }
    minP = (minP < 10) ? "0" + minP : minP;
    segP = (segP < 10) ? "0" + segP : segP;
    if (min <= 0 && seg <= 0) {
      end(timer);
      timer.innerHTML = '00:00';
    } else {
      timer.innerHTML = min + ":" + seg;
    }
    seg = parseInt(seg);
    min = parseInt(min);
  }
}

function paradinha() {
  if ((minP > 0) || (segP > 0)) {
    if (segP == 0) {
      segP = 59;
      minP -= 1;
    } else {
      segP -= 1;
    }
    minP = (minP < 10) ? "0" + minP : minP;
    segP = (segP < 10) ? "0" + segP : segP;
    if (minP <= 0 && segP <= 0) {
      end(timer);
      timer.innerHTML = '00:00';
    } else {
      timer.innerHTML = minP + ":" + segP;
    }
    segP = parseInt(segP);
    minP = parseInt(minP);
  }
}

start.addEventListener('click', function () {
  timer.classList.remove('vermelho');
  clearInterval(interval);
  start.disabled = true;
  pause.disabled = false;
  interval = setInterval(relogio, 1000);
});

pause.addEventListener('click', function () {
  timer.classList.remove('vermelho');
  clearInterval(interval);
  start.disabled = false;
  pause.disabled = true;
  interval = setInterval(paradinha, 1000);
});

function end(timer) {
  clearInterval(interval);
  timer.classList.add('vermelho');
  alarme.play();
  notificar('Pomodoro', 'O timer chegou ao fim!!');
}

function notificar(title, body) {
  const options = {
    body,
    icon: 'notification.jpg',
    requireInteraction: true
  }
  if ('Notification' in window) {
    if (Notification.permission === 'default') {
      Notification.requestPermission().then(r => {
        if (r === 'granted') {
          new Notification(title, options);
        }
      })
    } else if (Notification.permission === 'granted') {
      new Notification(title, options);
    } else {
      console.error('As notificações foram negadas');
    }
  } else {
    console.error('O navegador não suporta Notificações');
  }
}
