const input = document.querySelector('#input');
let bloco = document.querySelector('#bloco');
let b1 = document.querySelectorAll('button')[0];
let b2 = document.querySelectorAll('button')[1];
const worker = new Worker('worker-palavras.js');


b1.addEventListener('click', function () {
  let inputVal = input.value.toLowerCase();
  worker.postMessage([inputVal, 0]);
});

b2.addEventListener('click', function () {
  let inputVal = input.value.toLowerCase();
  worker.postMessage([inputVal, 1]);
});

worker.onmessage = function (msg) {
  bloco.innerHTML = msg.data.join(", ");
}

