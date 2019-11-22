mongoose = require('mongoose');
timestamp = require('mongoose-timestamp');

const ObraSchema = new mongoose.Schema({
    nm_autor: {
        type: String,
        required: true
    },
    ds_titulo: {
        type: String,
        required: true
    },
    nr_ano:{
        type: Number,
        required: true
    },
    nr_edicao: {
        type: Number,
        required: true
    },
    nm_local: {
        type: String,
        required: true
    },
    nm_editora: {
        type: String,
        required: true
    },
    qt_paginas: {
        type: Number,
        required: true
    },
    ds_isbn:{
        type: Number,
        required: true
    },
    ds_issn:{
        type: Number,
        required: true
    }
});

ObraSchema.plugin(timestamp);

const Obra = mongoose.model('Obra', ObraSchema);
module.exports = Obra;