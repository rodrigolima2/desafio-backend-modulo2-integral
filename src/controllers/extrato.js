const { contas, saques, depositos, transferencias } = require("../bancodedados");
const { indexDaConta } = require("../functions/procurarConta");
const { numeroContaValido, senhaValida } = require("../functions/validacoes");

async function extrato(req, res) {
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

    if (!senhaValida(conta, senha)) {
        res.status(401).json({ mensagem: 'Senha inválida.' });
        return;
    }

    const contaDepositos = depositos.filter(x => x.numero_conta === numeroConta);
    const contaSaques = saques.filter(x => x.numero_conta === numeroConta);
    const contaTransferenciasEnviadas = transferencias.filter(x => x.numero_conta_origem === numeroConta);
    const contaTransferenciasRecebidas = transferencias.filter(x => x.numero_conta_destino === numeroConta);

    const saida = {
        mensagem: 'Seu extrato',
        depositos: contaDepositos,
        saques: contaSaques,
        transferenciasEnviadas: contaTransferenciasEnviadas,
        transferenciasRecebidas: contaTransferenciasRecebidas
    };

    res.status(200).json(saida);
}

module.exports = { extrato, };