const knex = require('../config/db')

module.exports = app => {
  const { existsOrError } = app.api.validator

  const get = async (req, res) => {
    const antropometria = await knex("antropometria").select("*");
    return res.json(antropometria)
  }

  const remove = async (req, res) => {
    try {
      existsOrError(req.params.id, 'antropometria não existe!')

      const rowsDeleted = await app.db('antropometria').del()
        .where({ antropometria_id: req.params.id })
      existsOrError(rowsDeleted, 'antropometria não encontrado')

      res.status(204).send()
    }
    catch (msg) {
      return res.status(400).send(msg)
    }
  }

  const getById = (req, res) => {
    app.db('antropometria')
      .where({ antropometria_id: req.params.id })
      .first()
      .then(antropometria => res.json(antropometria))
  }

  const post = async (req, res) => {
    const { avaliacao_id, antropometria_altura, antropometria_pesoUsual, antropometria_pesoAtual, antropometria_descricaoPesoAtual, antropometria_descricaoPP, antropometria_dinamometria, antropometria_circunferenciaPanturrilha, antropometria_ambc, antropometria_cabd, antropometria_pp, antropometria_imc } = req.body;
    await knex("antropometria").insert({
      avaliacao_id,
      antropometria_altura,
      antropometria_pesoUsual,
      antropometria_pesoAtual,
      antropometria_descricaoPesoAtual,
      antropometria_descricaoPP,
      antropometria_dinamometria,
      antropometria_circunferenciaPanturrilha,
      antropometria_ambc,
      antropometria_cabd,
      antropometria_pp,
      antropometria_imc
    })
      .then((_) => res.status(201).send())
      .catch((err) => {
        console.log(res);
        return res.status(500).send(err);
      });
  }

  const put = async (req, res) => {
    const { avaliacao_id, antropometria_altura, antropometria_pesoUsual, antropometria_pesoAtual, antropometria_descricaoPesoAtual, antropometria_descricaoPP, antropometria_dinamometria, antropometria_circunferenciaPanturrilha, antropometria_ambc, antropometria_cabd, antropometria_pp, antropometria_imc } = req.body;
    const antropometria_id = req.params.id;
    if (antropometria_id) {
      app
        .db("antropometria")
        .update({
          avaliacao_id,
          antropometria_altura,
          antropometria_pesoUsual,
          antropometria_pesoAtual,
          antropometria_descricaoPesoAtual,
          antropometria_descricaoPP,
          antropometria_dinamometria,
          antropometria_circunferenciaPanturrilha,
          antropometria_ambc,
          antropometria_cabd,
          antropometria_pp,
          antropometria_imc
        })
        .where({ antropometria_id: antropometria_id })
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