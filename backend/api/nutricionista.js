const knex = require('../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const nutricionista = await knex("nutricionista").select("*");
        return res.json(nutricionista)
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Nutricionista não existe!')

            const rowsDeleted = await app.db('nutricionista').del()
                .where({ nutricionista_id: req.params.id })
            existsOrError(rowsDeleted, 'Nutricionista não encontrado')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const getById = (req, res) => {
        app.db('nutricionista')
            .where({ nutricionista_id: req.params.id })
            .first()
            .then(nutricionista => res.json(nutricionista))
    }

    const post = async (req, res) => {
        const { nutricionista_nome, nutricionista_crm } = req.body;
        await knex("nutricionista").insert({
            nutricionista_nome,
            nutricionista_crm
        })
            .then((_) => res.status(201).send())
            .catch((err) => {
                console.log(res);
                return res.status(500).send(err);
            });
    }

    const put = async (req, res) => {
        const { nutricionista_nome, nutricionista_crm } = req.body;
        const nutricionista_id = req.params.id;
        if (nutricionista_id) {
            app
                .db("nutricionista")
                .update({
                    nutricionista_nome,
                    nutricionista_crm
                })
                .where({ nutricionista_id: nutricionista_id })
                .then((res) => res.status(204).send())
                .catch((err) => {
                    res.status(500).send(err);
                });
        } else {
            return res.status(400);
        }
    }

    return { get, post, put, remove, getById }
}