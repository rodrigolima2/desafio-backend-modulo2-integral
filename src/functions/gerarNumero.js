const { contas } = require('../bancodedados');

function gerarNumero() {
    let novoNumero = `${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`;

    for (i = 0; i < contas.length; i++) {
        if (contas[i].numero === novoNumero) {
            novoNumero = gerarNumero();
        }
    }

    return novoNumero;
}

module.exports = { gerarNumero, };