const knex = require('../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const condicaoClinicaVersaoMedico = await knex("condicaoClinicaVersaoMedico").select("*");
        return res.json(condicaoClinicaVersaoMedico)
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Versao Medico não existe!')

            const rowsDeleted = await app.db('condicaoClinicaVersaoMedico').del()
                .where({ versaoMedico_id: req.params.id })
            existsOrError(rowsDeleted, 'Versao Medico não encontrado')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const getById = (req, res) => {
        app.db('condicaoClinicaVersaoMedico')
            .where({ condicaoClinicaVersaoMedico_id: req.params.id })
            .first()
            .then(condicaoClinicaVersaoMedico => res.json(condicaoClinicaVersaoMedico))
    }

    const post = async (req, res) => {
        const { versaoMedico_id, condicaoClinica_id } = req.body;
        await knex("condicaoClinicaVersaoMedico").insert({
            versaoMedico_id,
            condicaoClinica_id
        })
        .then((_) => res.status(201).send())
        .catch((err) => {
            console.log(res);
            return res.status(500).send(err);
        });
    }

    const put = async (req, res) => {
        const { versaoMedico_id, condicaoClinica_id } = req.body;
        const condicaoClinicaVersaoMedico_id = req.params.id;
        if (condicaoClinicaVersaoMedico_id) {
            app
            .db("condicaoClinicaVersaoMedico")
                .update({
                    versaoMedico_id,
                    condicaoClinica_id
                })
                .where({ condicaoClinicaVersaoMedico_id: condicaoClinicaVersaoMedico_id })
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