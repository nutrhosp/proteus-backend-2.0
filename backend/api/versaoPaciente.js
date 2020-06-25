const knex = require("../config/db");

module.exports = (app) => {
  const { existsOrError } = app.api.validator;

  const get = async (req, res) => {
    const versaoPaciente = await knex("versaoPaciente").select("*");
    return res.json(versaoPaciente);
  };

  const remove = async (req, res) => {
    try {
      existsOrError(req.params.id, "Paciente não existe!");

      const rowsDeleted = await app
        .db("paciente")
        .del()
        .where({ paciente_id: req.params.id });
      existsOrError(rowsDeleted, "Paciente não encontrado");

      res.status(204).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const getById = (req, res) => {
    app
      .db("paciente")
      .where({ paciente_id: req.params.id })
      .first()
      .then((paciente) => res.json(paciente));
  };

  const post = async (req, res) => {
    const versaoPaciente = req.body;
    try {
      const idVersaoPaciente = await knex("versaoPaciente").insert(
        versaoPaciente
      );

      res.json(idVersaoPaciente);
    } catch (err) {
      console.log(res);
      return res.status(500).send(err);
    }
  };

  const put = async (req, res) => {
    const {
      avaliacao_id,
      versaoPaciente_q1PesoAtual,
      versaoPaciente_q1PesoMes,
      versaoPaciente_q1PesoSemestre,
      versaoPaciente_q1Tamanho,
      versaoPaciente_q2Quantidade,
      versaoPaciente_q2Tipo,
      versaoPaciente_q2Dor,
      versaoPaciente_q2Outro,
      versaoPaciente_quadro1,
      versaoPaciente_quadro2,
      versaoPaciente_quadro3,
      versaoPaciente_quadro4,
    } = req.body;
    const versaoPaciente_id = req.params.id;
    if (versaoPaciente_id) {
      app
        .db("versaoPaciente")
        .update({
          avaliacao_id,
          versaoPaciente_q1PesoAtual,
          versaoPaciente_q1PesoMes,
          versaoPaciente_q1PesoSemestre,
          versaoPaciente_q1Tamanho,
          versaoPaciente_q2Quantidade,
          versaoPaciente_q2Tipo,
          versaoPaciente_q2Dor,
          versaoPaciente_q2Outro,
          versaoPaciente_quadro1,
          versaoPaciente_quadro2,
          versaoPaciente_quadro3,
          versaoPaciente_quadro4,
        })
        .where({ versaoPaciente_id: versaoPaciente_id })
        .then(() => res.status(204).send())
        .catch((err) => {
          res.status(500).send(err);
        });
    } else {
      return res.status(400);
    }
  };

  return { get, getById, post, put, remove };
};
