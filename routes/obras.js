const erros = require('restify-errors');
const Obra = require('../models/Obras')

module.exports = server => {
    //GET Obras
    server.get('/obras', async (req, res, next) => {
        try {
            const obras = await Obra.find({});
            res.send(obras);
            next();
        } catch (err) {
            return next(new erros.InvalidContentError(err));
        }
    });

    //GET Obras(_id)
    server.get('/obras/:id', async (req, res, next) => {
        try {
            const obras = await Obra.findById(req.params.id);
            res.send(obras);
            next();
        } catch (err) {
            return next(new erros.ResourceNotFoundError('Não existe a obra cadastrada com o id ' + req.params.id));
        }
    });

    //Post Obras
    server.post('/obras', async (req, res, next) => {
        ///Verificar JSON
        if (!req.is('application/json')) {
            return next(new erros.InvalidContentError("Espera 'application/json'"));
        }
        const { nm_autor, ds_titulo, nr_ano, nr_edicao, nm_local, nm_editora, qt_paginas, ds_isbn, ds_issn } = req.body;
        const obras = new Obra({
            nm_autor,
            ds_titulo,
            nr_ano,
            nr_edicao,
            nm_local,
            nm_editora,
            qt_paginas,
            ds_isbn,
            ds_issn
        });
        try {
            const novaObra = await obras.save();
            res.send(201);
            next();
        } catch (error) {
            return next(new erros.InternalError(error.message));
        }
    });

    //PUT Obras
    server.put('/obras/:id', async (req, res, next) => {
        ///Verificar JSON
        if (!req.is('application/json')) {
            return next(new erros.InvalidContentError("Espera 'application/json'"));
        }

        try {
            const obra = await Obra.findOneAndUpdate({ _id: req.params.id }, req.body);
            res.send(201);
            next();
        } catch {
            return next(new erros.ResourceNotFoundError('Não existe a obra cadastrada com o id ' + req.params.id));
        }
    });

    //DELETE Obras(_id)
    server.del('/obras/:id', async (req, res, next) => {
        try {
            const obras = await Obra.findOneAndRemove({ _id: req.params.id });
            res.send(204);
            next();
        } catch (err) {
            return next(new erros.ResourceNotFoundError('Não existe a obra cadastrada com o id ' + req.params.id));
        }
    });

}