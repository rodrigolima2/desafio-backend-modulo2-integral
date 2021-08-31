const { contas } = require('../bancodedados');
const { indexDaConta } = require('../functions/procurarConta');
const { algumCampoInformado, numeroContaValido, cpfJaExiste, emailJaExiste, cpfValido } = require('../functions/validacoes');

async function atualizarUsuarioConta(req, res) {
    const numeroInformado = req.params.numeroConta;

    if (!numeroContaValido(numeroInformado)) {
        res.status(400).json({ mensagem: 'Você deve informar uma conta válida.' });
        return;
    }

    const body = req.body;

    if (!algumCampoInformado(body)) {
        res.status(400).json({ mensagem: 'Você deve informar algum dado para ser atualizado: nome, cpf, data_nascimento, telefone, email ou senha.' });
        return;
    }

    const index = indexDaConta(numeroInformado);
    const conta = contas[index];
    const contaUsuario = contas[index].usuario;
    const nome = req.body.nome;
    const cpf = req.body.cpf;
    const data_nascimento = req.body.data_nascimento;
    const telefone = req.body.telefone;
    const email = req.body.email;
    const senha = req.body.senha;

    if (cpf) {
        if (!cpfValido(cpf)) {
            res.status(400).json({ mensagem: 'O CPF precisa ter 11 digitos.' });
            return;
        }

        if (cpfJaExiste(cpf)) {
            res.status(400).json({ mensagem: 'O CPF informado já está sendo usado.' });
            return;
        }
    }

    if (email) {
        if (emailJaExiste(email)) {
            res.status(400).json({ mensagem: 'O email informado já está sendo usado.' });
            return;
        }
    }

    if (nome) contaUsuario.nome = nome;
    if (cpf) contaUsuario.cpf = cpf;
    if (data_nascimento) contaUsuario.data_nascimento = data_nascimento;
    if (telefone) contaUsuario.telefone = telefone;
    if (email) contaUsuario.email = email;
    if (senha) contaUsuario.senha = senha;

    res.status(200).json({ mensagem: "Conta atualizada com sucesso!", });
}

module.exports = { atualizarUsuarioConta, };