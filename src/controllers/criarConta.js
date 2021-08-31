const { contas } = require('../bancodedados');
const { todosCamposInformados, cpfJaExiste, cpfValido, emailJaExiste } = require('../functions/validacoes');
const { gerarNumero } = require('../functions/gerarNumero');

async function criarConta(req, res) {
    const body = req.body;

    if (!todosCamposInformados(body)) {
        res.status(400).json({ mensagem: 'Todos os campos devem ser preenchidos: nome, cpf, data_nascimento, telefone, email e senha.' });
        return;
    }

    const nome = req.body.nome;
    const cpf = req.body.cpf;
    const data_nascimento = req.body.data_nascimento;
    const telefone = req.body.telefone;
    const email = req.body.email;
    const senha = req.body.senha;

    if (!cpfValido(cpf)) {
        res.status(400).json({ mensagem: 'O CPF precisa ter 11 digitos.' });
        return;
    }
    if (cpfJaExiste(cpf)) {
        res.status(400).json({ mensagem: 'O CPF informado já está sendo usado.' });
        return;
    }
    if (emailJaExiste(email)) {
        res.status(400).json({ mensagem: 'O email informado já está sendo usado.' });
        return;
    }

    const numero = gerarNumero();
    const saldo = 0;
    const usuario = {
        nome: nome,
        cpf: cpf,
        data_nascimento: data_nascimento,
        telefone: telefone,
        email: email,
        senha: senha
    };
    const conta = {
        numero: numero,
        saldo: saldo,
        usuario: usuario
    };

    contas.push(conta);
    res.status(201).json({ mensagem: 'Conta criada com sucesso.' });
}

module.exports = { criarConta, };