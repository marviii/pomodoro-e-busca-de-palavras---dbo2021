let palavras;
fetch('palavras.txt').then(resp => resp.text()).then((texto) => palavras = texto.split('\r\n'));
onmessage = function (mensg) {
  let input = mensg.data[0];
  let button = mensg.data[1];
  let final;
  if (button === 0) {
    final = contemLetras(palavras, input);
  }
  else {
    final = formadaLetras(palavras, input);
  }
  postMessage(final);
}

function contemLetras(palavras, input) {
  let bloco = [];
  for (let i = 0; i < palavras.length; i++) {
    let verif = true;
    for (let x = 0; x < input.length; x++) {
      if (palavras[i].toLowerCase().indexOf(input[x]) < 0) {
        verif = false;
      }
    }
    if (verif === true) {
      bloco.push(palavras[i]);
    }
  }
  return bloco;
}

function formadaLetras(palavras, input) {
  let bloco = [];
  let x = permutacao(input);
  for (i = 0; i < palavras.length; i++) {
    if (x.indexOf(palavras[i].toLowerCase()) >= 0) {
      bloco.push(palavras[i]);
    }
  }
  return bloco;
}

function permutacao(input) {
  if (input.length < 2) {
    return input;
  }
  let permutation = [];
  for (let i = 0; i < input.length; i++) {
    let letra = input[i];
    if (input.indexOf(letra) != i) {
      continue;
    }
    let sobrou = input.slice(0, i) + input.slice(i + 1);
    let perm = permutacao(sobrou);
    for (let x = 0; x < perm.length; x++) {
      permutation.push(letra + perm[x]);
    }
  }
  return permutation;
}
