const { contas, depositos } = require("../bancodedados");
const { indexDaConta } = require("../functions/procurarConta");
const { numeroContaValido, valorValido } = require("../functions/validacoes");
const format = require('date-fns/format');

async function depositar(req, res) {
    const numeroConta = req.body.numero_conta;
    const valor = req.body.valor;

    if (!numeroConta || valor === undefined) {
        res.status(400).json({ mensagem: 'Você precisa informar os dados: numero_conta e valor.' });
        return;
    }

    if (!numeroContaValido(numeroConta)) {
        res.status(400).json({ mensagem: 'Você deve informar uma conta válida, números em string.' });
        return;
    }

    if (!valorValido(valor)) {
        res.status(400).json({ mensagem: 'O valor de depósito informado não é válido, os números devem ser no formato number.' });
        return;
    }

    if (valor <= 0) {
        res.status(400).json({ mensagem: 'O valor de depósito deve ser maior que 0 (zero).' });
        return;
    }

    const index = indexDaConta(numeroConta);
    const conta = contas[index];
    const data = format(new Date(), "yyyy'-'MM'-'dd HH':'mm':'ss");

    conta.saldo += valor;
    depositos.push({
        data: data,
        numero_conta: numeroConta,
        valor: valor
    });

    res.status(200).json({
        mensagem: "Depósito realizado com sucesso!",
        conta: conta,
        deposito: depositos[depositos.length - 1]
    });
}

module.exports = { depositar, };