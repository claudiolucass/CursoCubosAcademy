const bancoDeDados = require('../bancodedados');

const depositarConta = (req, res) => {
    const { numero_conta, valor } = req.body;

    if (!numero_conta || !valor) {
        return res.status(400).json({ mensagem: 'Numero da conta e o valor do deposito sao obrigatorios.' });
    }

    const encontrarConta = bancoDeDados.contas.find(conta => conta.numero === numero_conta);

    if (!encontrarConta) {
        return res.status(404).json({ mensagem: 'Conta nao encontrada.' });
    }

    if (valor <= 0) {
        return res.status(400).json({ mensagem: 'O valor do deposito deve ser maior que zero.' });
    }

    encontrarConta.saldo += valor;

    const registrarDeposito = {
        data: new Date().toISOString(),
        numero_conta,
        valor,
    };

    bancoDeDados.depositos.push(registrarDeposito);

    res.status(200).json({ mensagem: 'Depósito realizado com sucesso' });

}

module.exports = {
    depositarConta
};
