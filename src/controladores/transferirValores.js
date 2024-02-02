const bancoDeDados = require('../bancodedados');

const transferirConta = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
        return res.status(400).json({ mensagem: 'Numero da conta de origem, numero da conta de destino, valor e senha sao obrigatorios.' });
    }

    const contaOrigem = bancoDeDados.contas.find(conta => conta.numero === numero_conta_origem);
    if (!contaOrigem) {
        return res.status(404).json({ mensagem: 'Conta de origem nao encontrada.' });
    }

    const contaDestino = bancoDeDados.contas.find(conta => conta.numero === numero_conta_destino);
    if (!contaDestino) {
        return res.status(404).json({ mensagem: 'Conta de destino nao encontrada.' });
    }

    if (senha !== contaOrigem.usuario.senha) {
        return res.status(400).json({ mensagem: 'Senha invalida.' });
    }

    if (valor > contaOrigem.saldo) {
        return res.status(400).json({ mensagem: 'Saldo insuficiente.' });
    }

    contaOrigem.saldo -= valor;

    contaDestino.saldo += valor;

    const registrarTransferencia = {
        data: new Date().toISOString(),
        numero_conta_origem,
        numero_conta_destino,
        valor,
    };

    bancoDeDados.transferencias.push(registrarTransferencia);

    res.status(200).json({ mensagem: 'Transferencia realizada com sucesso' });

}

module.exports = {
    transferirConta
};
