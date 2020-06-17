const knex = require('../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const avaliacaoGlobal = await knex("avaliacaoGlobal").select("*");
        return res.json(avaliacaoGlobal)
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'avaliacaoGlobal não existe!')

            const rowsDeleted = await app.db('avaliacaoGlobal').del()
                .where({ avaliacaoGlobal_id: req.params.id })
            existsOrError(rowsDeleted, 'avaliacaoGlobal não encontrado')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const getById = (req, res) => {
        app.db('avaliacaoGlobal')
            .where({ avaliacaoGlobal_id: req.params.id })
            .first()
            .then(avaliacaoGlobal => res.json(avaliacaoGlobal))
    }

    const post = async (req, res) => {
        const { versaoMedico_id, avaliacaoGlobal_peso, avaliacaoGlobal_nutrientes, avaliacaoGlobal_impactoNutricional, avaliacaoGlobal_funcionalidade, avaliacaoGlobal_exameFisico } = req.body;
        await knex("avaliacaoGlobal").insert({
            versaoMedico_id,
            avaliacaoGlobal_peso,
            avaliacaoGlobal_nutrientes,
            avaliacaoGlobal_impactoNutricional,
            avaliacaoGlobal_funcionalidade,
            avaliacaoGlobal_exameFisico
        })
            .then((_) => res.status(201).send())
            .catch((err) => {
                console.log(res);
                return res.status(500).send(err);
            });
    }

    const put = async (req, res) => {
        const { versaoMedico_id, avaliacaoGlobal_peso, avaliacaoGlobal_nutrientes, avaliacaoGlobal_impactoNutricional, avaliacaoGlobal_funcionalidade, avaliacaoGlobal_exameFisico } = req.body;
        const avaliacaoGlobal_id = req.params.id;
        if (avaliacaoGlobal_id) {
            app
                .db("avaliacaoGlobal")
                .update({
                    versaoMedico_id,
                    avaliacaoGlobal_peso,
                    avaliacaoGlobal_nutrientes,
                    avaliacaoGlobal_impactoNutricional,
                    avaliacaoGlobal_funcionalidade,
                    avaliacaoGlobal_exameFisico
                })
                .where({ avaliacaoGlobal_id: avaliacaoGlobal_id })
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