const { contas, saques } = require("../bancodedados");
const { indexDaConta } = require("../functions/procurarConta");
const { numeroContaValido, senhaValida, valorValido } = require("../functions/validacoes");
const format = require('date-fns/format');

async function sacar(req, res) {
    const numeroConta = req.body.numero_conta;
    const valor = req.body.valor;
    const senha = req.body.senha;

    if (!numeroConta || !senha || valor === undefined) {
        res.status(400).json({ mensagem: 'Você precisa informar os dados: numero_conta, valor e senha.' });
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

    const index = indexDaConta(numeroConta);
    const conta = contas[index];
    const saldo = conta.saldo;

    if (!senhaValida(conta, senha)) {
        res.status(401).json({ mensagem: 'Senha inválida.' });
        return;
    }

    if (valor <= 0) {
        res.status(400).json({ mensagem: 'O valor de saque deve ser maior que 0 (zero).' });
        return;
    }

    if (valor > saldo) {
        res.status(400).json({ mensagem: 'Saldo insuficiente.' });
        return;
    }

    const data = format(new Date(), "yyyy'-'MM'-'dd HH':'mm':'ss");

    conta.saldo -= valor;
    saques.push({
        data: data,
        numero_conta: numeroConta,
        valor: valor
    });

    res.status(200).json({
        mensagem: "Saque realizado com sucesso!",
        conta: conta,
        saque: saques[saques.length - 1]
    });
}

module.exports = { sacar, };