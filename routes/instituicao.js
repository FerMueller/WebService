const erros = require('restify-errors');
const Instituicao = require('../models/Instituicao')
module.exports = server => {
    //GET instituicao
    server.get('/instituicao', async (req, res, next) => {
        try {
            const instituicao = await Instituicao.find({});
            res.send(instituicao);
            next();
        } catch (err) {
            return next(new erros.InvalidContentError(err));
        }
    });

    //GET instituicao(_id)
    server.get('/instituicao/:id', async (req, res, next) => {
        try {
            const instituicao = await Instituicao.findById(req.params.id);
            res.send(instituicao);
            next();
        } catch (err) {
            return next(new erros.ResourceNotFoundError('Não existe a Instituicao cadastrada com o id ' + req.params.id));
        }
    });

    //Post instituicao
    server.post('/instituicao', async (req, res, next) => {
        ///Verificar JSON
        if (!req.is('application/json')) {
            return next(new erros.InvalidContentError("Espera 'application/json'"));
        }
        const { nm_nome, nm_entidade } = req.body;
        const instituicao = new Instituicao({
            nm_nome,
            nm_entidade
        });
        try {
            const novaInstituicao = await instituicao.save();
            res.send(201);
            next();
        } catch (error) {
            return next(new erros.InternalError(error.message));
        }
    });

    //PUT instituicao
    server.put('/instituicao/:id', async (req, res, next) => {
        ///Verificar JSON
        if (!req.is('application/json')) {
            return next(new erros.InvalidContentError("Espera 'application/json'"));
        }

        try {
            const instituicao = await Instituicao.findOneAndUpdate({ _id: req.params.id }, req.body);
            res.send(201);
            next();
        } catch {
            return next(new erros.ResourceNotFoundError('Não existe a Instituicao cadastrada com o id ' + req.params.id));
        }
    });

    //DELETE instituicao(_id)
    server.del('/instituicao/:id', async (req, res, next) => {
        try {
            const instituicao = await Instituicao.findOneAndRemove({ _id: req.params.id });
            res.send(204);
            next();
        } catch (err) {
            return next(new erros.ResourceNotFoundError('Não existe a Instituicao cadastrada com o id ' + req.params.id));
        }
    });

}