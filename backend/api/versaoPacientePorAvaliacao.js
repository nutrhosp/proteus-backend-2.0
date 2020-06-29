module.exports = (app) => {
  const getByEvaluation = async (req, res) => {
    const avaliacao = req.params.id;
    console.log(avaliacao);
    try {
      const record = await app
        .db("versaopaciente")
        .where({ avaliacao_id: avaliacao })
        .first();

      res.json(record);
    } catch (err) {
      console.log(err);
    }
  };

  return { getByEvaluation };
};
