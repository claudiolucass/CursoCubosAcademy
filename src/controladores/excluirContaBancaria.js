const bancoDeDados = require('../bancodedados');

const excluirConta = (req, res) => {
    const numeroConta = req.params.numeroConta;

    const encontrarIndice = bancoDeDados.contas.findIndex(conta => conta.numero === numeroConta);

    if (encontrarIndice === -1) {
        return res.status(404).json({ mensagem: 'Conta nao encontrada.' });
    }

    if (bancoDeDados.contas[encontrarIndice].saldo !== 0) {
        return res.status(400).json({ mensagem: 'Nao e permitido excluir uma conta com saldo em conta.' });
    }

    bancoDeDados.contas.splice(encontrarIndice, 1);

    res.status(200).json({ mensagem: 'Conta excluida com sucesso' });

}

module.exports = {
    excluirConta
};
