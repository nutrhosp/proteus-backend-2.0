const knex = require("../config/db");

module.exports = (app) => {
  const { existsOrError } = app.api.validator;

  const get = async (req, res) => {
    const versaoMedico = await knex("versaoMedico").select("*");
    return res.json(versaoMedico);
  };

  const remove = async (req, res) => {
    try {
      existsOrError(req.params.id, "versaoMedico não existe!");

      const rowsDeleted = await app
        .db("versaoMedico")
        .del()
        .where({ versaoMedico_id: req.params.id });
      existsOrError(rowsDeleted, "versaoMedico não encontrado");

      res.status(204).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const getById = (req, res) => {
    app
      .db("versaoMedico")
      .where({ versaoMedico_id: req.params.id })
      .first()
      .then((versaoMedico) => res.json(versaoMedico));
  };

  const post = async (req, res) => {
    const avaliacaoMedico = req.body;
    try {
      const newVersaoMedico = await knex("versaoMedico").insert(
        avaliacaoMedico
      );
      console.log(newVersaoMedico);
      res.json(newVersaoMedico);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  };

  const put = async (req, res) => {
    const avaliacaoMedico = req.body;
    const versaoMedico_id = req.params.id;
    if (versaoMedico_id) {
      app
        .db("versaoMedico")
        .update(avaliacaoMedico)
        .where({ versaoMedico_id: versaoMedico_id })
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
