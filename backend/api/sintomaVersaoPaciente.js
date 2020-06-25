const knex = require("../config/db");

module.exports = (app) => {
  const { existsOrError } = app.api.validator;

  const remove = async (req, res) => {
    try {
      existsOrError(req.params.id, "Versão Paciente não existe!");

      const rowsDeleted = await app
        .db("sintomaVersaoPaciente")
        .del()
        .where({ versaoPaciente_id: req.params.id });
      existsOrError(rowsDeleted, "Versão Paciente não encontrado");

      res.status(204).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const getByPatient = async (req, res) => {
    try {
      const symptoms = await app.db
        .select("sintomas_nome")
        .from("sintomaversaopaciente")
        .innerJoin(
          "sintomas",
          "sintomas.sintomas_id",
          "sintomaversaopaciente.sintomas_id"
        )
        .where({ versaoPaciente_id: req.params.id });

      res.json(symptoms);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  };

  const post = async (req, res) => {
    const sintomasPaciente = req.body;
    console.log(sintomasPaciente);
    await knex("sintomaVersaoPaciente")
      .insert(sintomasPaciente)
      .then((_) => res.status(201).send())
      .catch((err) => {
        console.log(res);
        return res.status(500).send(err);
      });
  };

  const put = async (req, res) => {
    const { versaoPaciente_id, sintomas_id } = req.body;
    const sintomaVersaoPaciente_id = req.params.id;
    if (sintomaVersaoPaciente_id) {
      app
        .db("sintomaVersaoPaciente")
        .update({
          versaoPaciente_id,
          sintomas_id,
        })
        .where({ sintomaVersaoPaciente_id: sintomaVersaoPaciente_id })
        .then((res) => res.status(204).send())
        .catch((err) => {
          res.status(500).send(err);
        });
    } else {
      return res.status(400);
    }
  };

  return { getByPatient, post, put, remove };
};
