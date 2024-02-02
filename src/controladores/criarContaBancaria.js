const bancoDeDados = require('../bancodedados');

const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: 'Nome, CPF, data de nascimento, telefone, e-mail e senha sao obrigatorios.' });
    }

    if (bancoDeDados.contas.some(conta => conta.usuario.cpf === cpf)) {
        return res.status(400).json({ mensagem: 'CPF ja cadastrado.' });
    }

    if (bancoDeDados.contas.some(conta => conta.usuario.email === email)) {
        return res.status(400).json({ mensagem: 'E-mail ja cadastrado.' });
    }

    const gerarNumeroConta = (bancoDeDados.contas.length + 1).toString();
    const novaConta = {
        numero: gerarNumeroConta,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    };

    bancoDeDados.contas.push(novaConta);

    res.status(201).json({
        numero: novaConta.numero,
        saldo: novaConta.saldo,
        usuario: novaConta.usuario
    });
}

module.exports = {
    criarConta
};
