const { contas } = require("../bancodedados");
const { indexDaConta } = require("../functions/procurarConta");
const { numeroContaValido, senhaValida } = require("../functions/validacoes");

async function saldo(req, res) {
    const numeroConta = req.query.numero_conta;
    const senha = req.query.senha;

    if (!numeroConta || !senha) {
        res.status(400).json({ mensagem: 'Você precisa informar os dados: numero_conta e senha, a partir da URL.' });
        return;
    }

    if (!numeroContaValido(numeroConta)) {
        res.status(400).json({ mensagem: 'Você deve informar uma conta válida.' });
        return;
    }

    const index = indexDaConta(numeroConta);
    const conta = contas[index];
    const saldo = conta.saldo;

    if (!senhaValida(conta, senha)) {
        res.status(401).json({ mensagem: 'Senha inválida.' });
        return;
    }

    res.status(200).json({
        conta: conta.numero,
        saldo: saldo
    });
}

module.exports = { saldo, };