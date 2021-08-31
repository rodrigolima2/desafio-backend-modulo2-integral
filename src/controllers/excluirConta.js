const { contas } = require("../bancodedados");
const { indexDaConta } = require("../functions/procurarConta");
const { numeroContaValido } = require("../functions/validacoes");

async function excluirConta(req, res) {
    const numeroInformado = req.params.numeroConta;

    if (!numeroContaValido(numeroInformado)) {
        res.status(404).json({ mensagem: 'Conta não existe.' });
        return;
    }

    const index = indexDaConta(numeroInformado);
    const conta = contas[index];

    if (conta.saldo != 0) {
        res.status(400).json({ mensagem: 'Para excluir a conta o seu saldo deve ser igual a 0 (zero).' });
        return;
    }

    contas.splice(index, 1);
    res.status(200).json({ mensagem: 'Conta excluida com sucesso!' });
}

module.exports = { excluirConta, };