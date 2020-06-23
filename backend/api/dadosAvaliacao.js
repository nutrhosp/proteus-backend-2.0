module.exports = (app) => {
  const getAll = async (req, res) => {
    const records = await app.db
      .select(
        "paciente.paciente_id",
        "paciente_nome",
        "paciente_cpf",
        "avaliacao_dataPaciente"
      )
      .max("avaliacao_id", { as: "avaliacao_id" })
      .from("avaliacao")
      .innerJoin("paciente", "paciente.paciente_id", "avaliacao.paciente_id")
      .groupBy("avaliacao.paciente_id");

    console.log(records);

    res.json(records);
  };

  return { getAll };
};
