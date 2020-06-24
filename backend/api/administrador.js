const knex = require("../config/db");
const bcrypt = require("bcryptjs");

module.exports = (app) => {
  const { existsOrError, notExistsOrError, equalsOrError } = app.api.validator;

  const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  const get = async (req, res) => {
    const adm = await knex("administrador").select("*");
    return res.json(adm);
  };

  const remove = async (req, res) => {
    try {
      existsOrError(req.params.id, "Administrador não existe!");

      const rowsDeleted = await app
        .db("administrador")
        .del()
        .where({ adm_id: req.params.id });
      existsOrError(rowsDeleted, "administrador não encontrado");

      res.status(204).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const getById = (req, res) => {
    app
      .db("administrador")
      .where({ adm_id: req.params.id })
      .first()
      .then((administrador) => res.json(administrador));
  };

  const post = async (req, res) => {
    let { adm_login, adm_senha } = req.body;
    try {
      existsOrError(adm_login, "Login não informado");
      existsOrError(adm_senha, "Senha não informada");

      const admFromDB = await knex("administrador")
        .where({ adm_login: adm_login })
        .first();
      if (!adm_login) {
        notExistsOrError(admFromDB, "Administrador já cadastrado");
        res.status(400);
      }
    } catch (msg) {
      console.log(msg);
      return res.status(400).send(msg);
    }

    adm_senha = encryptPassword(adm_senha);

    await knex("administrador").insert({
      adm_login,
      adm_senha,
    });
  };

  const put = async (req, res) => {
    const { adm_login, adm_senha } = req.body;
    const adm_id = req.params.id;
    if (adm_id) {
      app
        .db("administrador")
        .update({
          adm_login,
          adm_senha,
        })
        .where({ adm_id: adm_id })
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
