const knex = require('../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const sintomas = await knex("sintomas").select("*");
        return res.json(sintomas)
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'sintomas não existe!')

            const rowsDeleted = await app.db('sintomas').del()
                .where({ sintomas_id: req.params.id })
            existsOrError(rowsDeleted, 'sintomas não encontrado')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const getById = (req, res) => {
        app.db('sintomas')
            .where({ sintomas_id: req.params.id })
            .first()
            .then(sintomas => res.json(sintomas))
    }

    const post = async (req, res) => {
        const { sintomas_nome } = req.body;
        await knex("sintomas").insert({
            sintomas_nome
        })
            .then((_) => res.status(201).send())
            .catch((err) => {
                console.log(res);
                return res.status(500).send(err);
            });
    }

    const put = async (req, res) => {
        const { sintomas_nome } = req.body;
        const sintomas_id = req.params.id;
        if (sintomas_id) {
            app
                .db("sintomas")
                .update({
                    sintomas_nome
                })
                .where({ sintomas_id: sintomas_id })
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