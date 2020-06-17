const knex = require('../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const condicaoClinica = await knex("condicaoClinica").select("*");
        return res.json(condicaoClinica)
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'condicaoClinica não existe!')

            const rowsDeleted = await app.db('condicaoClinica').del()
                .where({ condicaoClinica_id: req.params.id })
            existsOrError(rowsDeleted, 'condicaoClinica não encontrado')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const getById = (req, res) => {
        app.db('condicaoClinica')
            .where({ condicaoClinica_id: req.params.id })
            .first()
            .then(condicaoClinica => res.json(condicaoClinica))
    }

    const post = async (req, res) => {
        const { condicaoClinica_nome } = req.body;
        await knex("condicaoClinica").insert({
            condicaoClinica_nome
        })
            .then((_) => res.status(201).send())
            .catch((err) => {
                console.log(res);
                return res.status(500).send(err);
            });
    }

    const put = async (req, res) => {
        const { condicaoClinica_nome } = req.body;
        const condicaoClinica_id = req.params.id;
        if (condicaoClinica_id) {
            app
                .db("condicaoClinica")
                .update({
                    condicaoClinica_nome
                })
                .where({ condicaoClinica_id: condicaoClinica_id })
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