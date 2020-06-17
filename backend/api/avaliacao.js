const knex = require('../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const avaliacao = await knex("avaliacao").select("*");
        return res.json(avaliacao)
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'avaliacao não existe!')

            const rowsDeleted = await app.db('antropometria').del()
                .where({ avaliacao_id: req.params.id })
            await knex('avaliacao').del()
                .where({ avaliacao_id: req.params.id })
            existsOrError(rowsDeleted, 'avaliacao não encontrado')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const getById = (req, res) => {
        knex('avaliacao')
            .where({ avaliacao_id: req.params.id })
            .first()
            .then(avaliacao => res.json(avaliacao))
    }

    const post = async (req, res) => {
        const { paciente_id, nutricionista_id, avaliacao_situacao, avaliacao_conduta, avaliacao_riscoNutricional, avaliacao_t, avaliacao_m, avaliacao_n, avaliacao_g, avaliacao_dataPaciente, avaliacao_dataMedico, avaliacao_acompanhante, avaliacao_diagnostico, avaliacao_tratamento, avaliacao_alergia, avaliacao_atividadeFisica, avaliacao_ritmoUrinario, avaliacao_ritmoIntestino, avaliacao_estadiamento, avaliacao_exame, avaliacao_medicamento } = req.body;
        await knex("avaliacao").insert({
            paciente_id,
            nutricionista_id,
            avaliacao_situacao,
            avaliacao_conduta,
            avaliacao_riscoNutricional,
            avaliacao_t,
            avaliacao_m,
            avaliacao_n,
            avaliacao_g,
            avaliacao_dataPaciente,
            avaliacao_dataMedico,
            avaliacao_acompanhante,
            avaliacao_diagnostico,
            avaliacao_tratamento,
            avaliacao_alergia,
            avaliacao_atividadeFisica,
            avaliacao_ritmoUrinario,
            avaliacao_ritmoIntestino,
            avaliacao_estadiamento,
            avaliacao_exame,
            avaliacao_medicamento
        })
            .then((_) => res.status(201).send())
            .catch((err) => {
                console.log(res);
                return res.status(500).send(err);
            });
    }

    const put = async (req, res) => {
        const { paciente_id, nutricionista_id, avaliacao_situacao, avaliacao_conduta, avaliacao_riscoNutricional, avaliacao_t, avaliacao_m, avaliacao_n, avaliacao_g, avaliacao_dataPaciente, avaliacao_dataMedico, avaliacao_acompanhante, avaliacao_diagnostico, avaliacao_tratamento, avaliacao_alergia, avaliacao_atividadeFisica, avaliacao_ritmoUrinario, avaliacao_ritmoIntestino, avaliacao_estadiamento, avaliacao_exame, avaliacao_medicamento } = req.body;
        const avaliacao_id = req.params.id;
        if (avaliacao_id) {
            knex("avaliacao").update({
                paciente_id,
                nutricionista_id,
                avaliacao_situacao,
                avaliacao_conduta,
                avaliacao_riscoNutricional,
                avaliacao_t,
                avaliacao_m,
                avaliacao_n,
                avaliacao_g,
                avaliacao_dataPaciente,
                avaliacao_dataMedico,
                avaliacao_acompanhante,
                avaliacao_diagnostico,
                avaliacao_tratamento,
                avaliacao_alergia,
                avaliacao_atividadeFisica,
                avaliacao_ritmoUrinario,
                avaliacao_ritmoIntestino,
                avaliacao_estadiamento,
                avaliacao_exame,
                avaliacao_medicamento
            })
                .where({ avaliacao_id: avaliacao_id })
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