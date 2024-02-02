const bancoDeDados = require('../bancodedados');

const extratoConta = (req, res) => {
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

    const depositos = bancoDeDados.depositos.filter(deposito => deposito.numero_conta === numero_conta);
    const saques = bancoDeDados.saques.filter(saques => saques.numero_conta === numero_conta);
    const transferenciasEnviadas = bancoDeDados.transferencias.filter(transferencia => transferencia.numero_conta_origem === numero_conta);
    const transferenciasRecebidas = bancoDeDados.transferencias.filter(transferencia => transferencia.numero_conta_destino === numero_conta);

    res.status(200).json({
        depositos,
        saques,
        transferenciasEnviadas,
        transferenciasRecebidas
    });

}

module.exports = {
    extratoConta
};
