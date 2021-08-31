const bancoDeDados = require('../bancodedados');

async function listarContas(req, res) {
    const senha = await req.query.senha_banco;

    if (senha !== '123') {
        res.status(401).json({ mensagem: 'Senha incorreta.' });
        return;
    }

    res.status(200).json(bancoDeDados.contas);
}

module.exports = { listarContas, };