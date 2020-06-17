const knex = require('../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const exameFisicoVersaoMedico = await knex("exameFisicoVersaoMedico").select("*");
        return res.json(exameFisicoVersaoMedico)
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Versao Medico não existe!')

            const rowsDeleted = await app.db('exameFisicoVersaoMedico').del()
                .where({ versaoMedico_id: req.params.id })
            existsOrError(rowsDeleted, 'Versao Medico não encontrado')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const getById = (req, res) => {
        app.db('exameFisicoVersaoMedico')
            .where({ exameFisicoVersaoMedico_id: req.params.id })
            .first()
            .then(exameFisicoVersaoMedico => res.json(exameFisicoVersaoMedico))
    }

    const post = async (req, res) => {
        const { versaoMedico_id, exameFisico_id, exameFisicoVersaoMedico_valor } = req.body;
        await knex("exameFisicoVersaoMedico").insert({
            versaoMedico_id,
            exameFisico_id,
            exameFisicoVersaoMedico_valor
        })
            .then((_) => res.status(201).send())
            .catch((err) => {
                console.log(res);
                return res.status(500).send(err);
            });
    }

    const put = async (req, res) => {
        const { versaoMedico_id, exameFisico_id, exameFisicoVersaoMedico_valor } = req.body;
        const exameFisicoVersaoMedico_id = req.params.id;
        if (exameFisicoVersaoMedico_id) {
            app
                .db("exameFisicoVersaoMedico")
                .update({
                    versaoMedico_id,
                    exameFisico_id,
                    exameFisicoVersaoMedico_valor
                })
                .where({ exameFisicoVersaoMedico_id: exameFisicoVersaoMedico_id })
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