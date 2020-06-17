const knex = require('../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const sintomaVersaoPaciente = await knex("sintomaVersaoPaciente").select("*");
        return res.json(sintomaVersaoPaciente)
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Versão Paciente não existe!')

            const rowsDeleted = await app.db('sintomaVersaoPaciente').del()
                .where({ versaoPaciente_id: req.params.id })
            existsOrError(rowsDeleted, 'Versão Paciente não encontrado')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const getById = (req, res) => {
        app.db('sintomaVersaoPaciente')
            .where({ sintomaVersaoPaciente_id: req.params.id })
            .first()
            .then(sintomaVersaoPaciente => res.json(sintomaVersaoPaciente))
    }

    const post = async (req, res) => {
        const { versaoPaciente_id, sintomas_id } = req.body;
        await knex("sintomaVersaoPaciente").insert({
            versaoPaciente_id,
            sintomas_id
        })
            .then((_) => res.status(201).send())
            .catch((err) => {
                console.log(res);
                return res.status(500).send(err);
            });
    }

    const put = async (req, res) => {
        const { versaoPaciente_id, sintomas_id } = req.body;
        const sintomaVersaoPaciente_id = req.params.id;
        if (sintomaVersaoPaciente_id) {
            app
                .db("sintomaVersaoPaciente")
                .update({
                    versaoPaciente_id,
                    sintomas_id
                })
                .where({ sintomaVersaoPaciente_id: sintomaVersaoPaciente_id })
                .then((res) => res.status(204).send())
                .catch((err) => {
                    res.status(500).send(err);
                });
        } else {
            return res.status(400);
        }
    }

    return { get, getById, post, put, remove }
}