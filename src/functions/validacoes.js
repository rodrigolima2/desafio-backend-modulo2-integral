const bancoDeDados = require('../bancodedados');
const { contas } = require('../bancodedados');

function todosCamposInformados(body) {
    if (!body.nome || !body.cpf || !body.data_nascimento || !body.telefone || !body.email || !body.senha) {
        return false;
    } else {
        return true;
    }
};

function algumCampoInformado(body) {
    if (body.nome || body.cpf || body.data_nascimento || body.telefone || body.email || body.senha) {
        return true;
    } else {
        return false;
    }
}

function numeroContaValido(numero) {
    for (i = 0; i < contas.length; i++) {
        if (contas[i].numero === numero) {
            return true;
        }
    }

    return false;
}

function valorValido(valor) {
    if (typeof (valor) !== 'number') {
        return false;
    } else {
        return true;
    }
}

function senhaValida(conta, senha) {
    if (conta.usuario.senha === senha) {
        return true;
    } else {
        return false;
    }
}

function cpfValido(cpf) {
    if (!cpf || cpf.length !== 11) {
        return false;
    } else {
        return true;
    }
}

function cpfJaExiste(cpf) {
    for (i = 0; i < contas.length; i++) {
        if (contas[i].usuario.cpf === cpf) {
            return true;
        }
    }

    return false;
}

function emailJaExiste(email) {
    for (i = 0; i < contas.length; i++) {
        if (contas[i].usuario.email === email) {
            return true;
        }
    }

    return false;
}


module.exports = {
    todosCamposInformados,
    algumCampoInformado,
    numeroContaValido,
    valorValido,
    senhaValida,
    cpfValido,
    cpfJaExiste,
    emailJaExiste,
};