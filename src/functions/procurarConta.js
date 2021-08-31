const { contas } = require("../bancodedados");

function indexDaConta(numeroConta) {
    let index = -1;

    for (i = 0; i < contas.length; i++) {
        if (contas[i].numero === numeroConta) {
            return index = i;
        }
    }

    return index;
}

module.exports = { indexDaConta, };