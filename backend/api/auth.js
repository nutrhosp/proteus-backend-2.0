const { authSecret } = require("../.env");
const jwt = require("jwt-simple");
const bcrypt = require("bcryptjs");

module.exports = (app) => {
  const signIn = async (req, res) => {
    if (!req.body.adm_email || !req.body.adm_senha) {
      return res.status(400).send("Insira email e senha");
    }

    const user = await app
      .db("administrador")
      .where({ adm_login: req.body.adm_email })
      .first();

    if (!user) return res.status(400).send("Administrador não encontrado");

    const isMatch = bcrypt.compareSync(req.body.adm_senha, user.adm_senha);
    if (!isMatch)
      return res.status(401).send("Combinação de email e senha inválida!");

    const now = Date.now();

    payload = {
      id: user.adm_id,
      name: user.adm_name,
      email: user.adm_email,
      senha: user.adm_senha,
      iat: now,
      exp: now + 1000 * 60 * 60 * 24,
    };

    res.json({
      ...payload,
      token: jwt.encode(payload, authSecret),
    });
  };

  const validateToken = (req, res) => {
    const userData = req.body || null;

    try {
      if (userData) {
        const token = jwt.decode(userData.token, authSecret);
        if (new Date(token.exp * 1000) > new Date()) {
          return res.send(true);
        }
      }
    } catch (e) {
      res.status(401);
    }
    res.send(false);
  };

  return { signIn, validateToken };
};
