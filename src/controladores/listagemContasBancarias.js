const bancoDeDados = require('../bancodedados');

const listarContas = (req, res) => {
    const senhaBanco = req.query.senha_banco;

    if (!senhaBanco) {
        return res.status(400).json({ mensagem: 'Senha e obrigatoria.' });
    }
    if (senhaBanco !== bancoDeDados.banco.senha) {
        return res.status(403).json({ mensagem: 'Senha invalida.' });
    }

    res.status(200).json(bancoDeDados.contas);
}

module.exports = {
    listarContas
};
