const bancoDeDados = require('../bancodedados');

const sacarConta = (req, res) => {
    const { numero_conta, valor, senha } = req.body;

    if (!numero_conta || !valor || !senha) {
        return res.status(400).json({ mensagem: 'Numero da conta, valor e senha sao obrigatorios.' });
    }

    const encontrarConta = bancoDeDados.contas.find(conta => conta.numero === numero_conta);

    if (!encontrarConta) {
        return res.status(404).json({ mensagem: 'Conta nao encontrada.' });
    }

    if (senha !== encontrarConta.usuario.senha) {
        return res.status(400).json({ mensagem: 'Senha invalida.' });
    }
    if (valor > encontrarConta.saldo) {
        return res.status(400).json({ mensagem: 'Saldo insuficiente.' });
    }

    encontrarConta.saldo -= valor;

    const saque = {
        data: new Date().toISOString(),
        numero_conta,
        valor,
    };

    bancoDeDados.saques.push(saque);

    res.status(200).json({ mensagem: 'Saque realizado com sucesso' });

}

module.exports = {
    sacarConta
};
