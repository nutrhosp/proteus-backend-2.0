const knex = require('../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const exameFisico = await knex("exameFisico").select("*");
        return res.json(exameFisico)
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'exameFisico não existe!')

            const rowsDeleted = await app.db('exameFisico').del()
                .where({ exameFisico_id: req.params.id })
            existsOrError(rowsDeleted, 'exameFisico não encontrado')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const getById = (req, res) => {
        app.db('exameFisico')
            .where({ exameFisico_id: req.params.id })
            .first()
            .then(exameFisico => res.json(exameFisico))
    }

    const post = async (req, res) => {
        const { exameFisico_nome } = req.body;
        await knex("exameFisico").insert({
            exameFisico_nome
        })
            .then((_) => res.status(201).send())
            .catch((err) => {
                console.log(res);
                return res.status(500).send(err);
            });
    }

    const put = async (req, res) => {
        const { exameFisico_nome } = req.body;
        const exameFisico_id = req.params.id;
        if (exameFisico_id) {
            app
                .db("exameFisico")
                .update({
                    exameFisico_nome
                })
                .where({ exameFisico_id: exameFisico_id })
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