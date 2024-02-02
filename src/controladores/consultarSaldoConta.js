const bancoDeDados = require('../bancodedados');

const consultarSaldoConta = (req, res) => {
    const { numero_conta, senha } = req.query;

    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: 'Numero da conta e senha sao obrigatorios.' });
    }

    const encontrarConta = bancoDeDados.contas.find(conta => conta.numero === numero_conta);
    if (!encontrarConta) {
        return res.status(404).json({ mensagem: 'Conta nao encontrada.' });
    }

    if (senha !== encontrarConta.usuario.senha) {
        return res.status(400).json({ mensagem: 'Senha invalida.' });
    }

    res.status(200).json({ saldo: encontrarConta.saldo });

}

module.exports = {
    consultarSaldoConta
};
