mongoose = require('mongoose');
timestamp = require('mongoose-timestamp');

const InstituicaoSchema = new mongoose.Schema({
    nm_nome: {
        type: String,
        required: true
    },
    nm_entidade: {
        type: String,
        required: true
    }
});

InstituicaoSchema.plugin(timestamp);

const Instituicao = mongoose.model('Instituicao', InstituicaoSchema);
module.exports = Instituicao;