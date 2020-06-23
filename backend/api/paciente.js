const knex = require("../config/db");

module.exports = (app) => {
  const { existsOrError } = app.api.validator;

  const get = async (req, res) => {
    const paciente = await knex("paciente").select("*");
    return res.json(paciente);
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
    const paciente = req.body;
    await knex("paciente")
      .insert(paciente)
      .then((_) => res.status(201).send())
      .catch((err) => {
        console.log(res);
        return res.status(500).send(err);
      });
  };

  const put = async (req, res) => {
    const paciente = req.body;
    const paciente_id = req.params.id;
    if (paciente_id) {
      app
        .db("paciente")
        .update(paciente)
        .where({ paciente_id: paciente_id })
        .then((res) => res.status(204).send())
        .catch((err) => {
          res.status(500).send(err);
        });
    } else {
      return res.status(400);
    }
  };

  return { get, getById, post, put, remove };
};
