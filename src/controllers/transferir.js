const { contas, transferencias } = require("../bancodedados");
const { indexDaConta } = require("../functions/procurarConta");
const { numeroContaValido, valorValido, senhaValida } = require("../functions/validacoes");
const format = require('date-fns/format');

async function transferir(req, res) {
    const numeroConta = req.body.numero_conta_origem;
    const numeroContaDestino = req.body.numero_conta_destino;
    const valor = req.body.valor;
    const senha = req.body.senha;

    if (!numeroConta || !numeroContaDestino || !senha || valor === undefined) {
        res.status(400).json({ mensagem: 'Você precisa informar os dados: numero_conta_origem, numero_conta_destino, valor e senha.' });
        return;
    }

    if (!numeroContaValido(numeroConta)) {
        res.status(400).json({ mensagem: 'Você deve informar uma conta de origem válida, números em string.' });
        return;
    }

    if (!numeroContaValido(numeroContaDestino)) {
        res.status(400).json({ mensagem: 'Você deve informar uma conta de destino válida, números em string.' });
        return;
    }

    if (numeroConta === numeroContaDestino) {
        res.status(400).json({ mensagem: 'Você não pode transferir para você mesmo.' });
    }

    if (!valorValido(valor)) {
        res.status(400).json({ mensagem: 'O valor de depósito informado não é válido, os números devem ser no formato number.' });
        return;
    }

    const indexContaOrigem = indexDaConta(numeroConta);
    const contaOrigem = contas[indexContaOrigem];
    const saldo = contaOrigem.saldo;

    if (!senhaValida(contaOrigem, senha)) {
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

    const indexContaDestino = indexDaConta(numeroContaDestino);
    const contaDestino = contas[indexContaDestino];
    const data = format(new Date(), "yyyy'-'MM'-'dd HH':'mm':'ss");

    contaOrigem.saldo -= valor;
    contaDestino.saldo += valor;
    transferencias.push({
        data: data,
        numero_conta_origem: numeroConta,
        numero_conta_destino: numeroContaDestino,
        valor: valor
    });

    res.status(200).json({
        mensagem: "Transferência realizada com sucesso!",
        conta: contaOrigem,
        transferência: transferencias[transferencias.length - 1]
    });
}

module.exports = { transferir, };