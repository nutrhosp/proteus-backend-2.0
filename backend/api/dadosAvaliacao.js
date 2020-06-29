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

  const getByPatient = async (req, res) => {
    const patient = req.params.id;
    console.log(patient);
    try {
      const records = await app.db
        .select(
          "avaliacao.avaliacao_id",
          "avaliacao_dataMedico",
          "versaomedico_pontuacaoTotal",
          "versaoMedico_avaliacaoGlobal",
          "versaoMedico_id"
        )
        .from("avaliacao")
        .innerJoin(
          "versaomedico",
          "avaliacao.avaliacao_id",
          "versaomedico.avaliacao_id"
        )
        .where({ paciente_id: patient });

      res.json(records);
    } catch (err) {
      console.log(err);
    }
  };

  return { getAll, getByPatient };
};
