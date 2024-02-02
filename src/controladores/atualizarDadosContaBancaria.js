const bancoDeDados = require('../bancodedados');

const atualizarConta = (req, res) => {
    const numeroConta = req.params.numeroConta;
    const atualizarPropriedades = req.body;

    const encontrarConta = bancoDeDados.contas.find(conta => conta.numero === numeroConta);

    if (!encontrarConta) {
        return res.status(404).json({ mensagem: 'Conta nao encontrada.' });
    }

    if (Object.keys(atualizarPropriedades).length === 0) {
        return res.status(400).json({ mensagem: 'Informe ao menos uma propriedade para atualizar.' });
    }

    if (atualizarPropriedades.cpf && bancoDeDados.contas.some(conta => conta.usuario.cpf === atualizarPropriedades.cpf)) {
        return res.status(400).json({ mensagem: 'CPF ja cadastrado.' });
    }
    if (atualizarPropriedades.email && bancoDeDados.contas.some(conta => conta.usuario.email === atualizarPropriedades.email)) {
        return res.status(400).json({ mensagem: 'E-mail ja cadastrado.' });
    }

    for (const propriedade in atualizarPropriedades) {
        if (atualizarPropriedades.hasOwnProperty(propriedade)) {
            encontrarConta.usuario[propriedade] = atualizarPropriedades[propriedade];
        }
    }

    res.status(200).json({ mensagem: 'Conta atualizada com sucesso' });
}

module.exports = {
    atualizarConta
};



