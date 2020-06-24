module.exports = (app) => {
  app
    .route("/administrador")
    .get(app.api.administrador.get)
    .post(app.api.administrador.post);

  app
    .route("/administrador/:id")
    .get(app.api.administrador.getById)
    .delete(app.api.administrador.remove)
    .put(app.api.administrador.put);

  app.route("/login").post(app.api.auth.signIn);

  app.route("/paciente").get(app.api.paciente.get).post(app.api.paciente.post);

  app
    .route("/paciente/:id")
    .get(app.api.paciente.getById)
    .delete(app.api.paciente.remove)
    .put(app.api.paciente.put);

  app
    .route("/nutricionista")
    .get(app.api.nutricionista.get)
    .post(app.api.nutricionista.post);

  app
    .route("/nutricionista/:id")
    .get(app.api.nutricionista.getById)
    .delete(app.api.nutricionista.remove)
    .put(app.api.nutricionista.put);

  app.route("/dados_avaliacao").get(app.api.dadosAvaliacao.getAll);

  app
    .route("/avaliacao")
    .get(app.api.avaliacao.get)
    .post(app.api.avaliacao.post);

  app
    .route("/avaliacao/:id")
    .get(app.api.avaliacao.getById)
    .delete(app.api.avaliacao.remove)
    .put(app.api.avaliacao.put);

  app
    .route("/antropometria")
    .get(app.api.antropometria.get)
    .post(app.api.antropometria.post);

  app
    .route("/antropometria/:id")
    .get(app.api.antropometria.getById)
    .delete(app.api.antropometria.remove)
    .put(app.api.antropometria.put);

  app
    .route("/versao_paciente")
    .get(app.api.versaoPaciente.get)
    .post(app.api.versaoPaciente.post);

  app
    .route("/versao_paciente/:id")
    .get(app.api.versaoPaciente.getById)
    .delete(app.api.versaoPaciente.remove)
    .put(app.api.versaoPaciente.put);

  app
    .route("/versao_medico")
    .get(app.api.versaoMedico.get)
    .post(app.api.versaoMedico.post);

  app
    .route("/versao_medico/:id")
    .get(app.api.versaoMedico.getById)
    .delete(app.api.versaoMedico.remove)
    .put(app.api.versaoMedico.put);

  app
    .route("/avaliacao_global")
    .get(app.api.avaliacaoGlobal.get)
    .post(app.api.avaliacaoGlobal.post);

  app
    .route("/avaliacao_global/:id")
    .get(app.api.avaliacaoGlobal.getById)
    .delete(app.api.avaliacaoGlobal.remove)
    .put(app.api.avaliacaoGlobal.put);

  app.route("/sintomas").get(app.api.sintomas.get).post(app.api.sintomas.post);

  app
    .route("/sintomas/:id")
    .get(app.api.sintomas.getById)
    .delete(app.api.sintomas.remove)
    .put(app.api.sintomas.put);

  app
    .route("/exame_fisico")
    .get(app.api.exameFisico.get)
    .post(app.api.exameFisico.post);

  app
    .route("/exame_fisico/:id")
    .get(app.api.exameFisico.getById)
    .delete(app.api.exameFisico.remove)
    .put(app.api.exameFisico.put);

  app
    .route("/condicao_clinica")
    .get(app.api.condicaoClinica.get)
    .post(app.api.condicaoClinica.post);

  app
    .route("/condicao_clinica/:id")
    .get(app.api.condicaoClinica.getById)
    .delete(app.api.condicaoClinica.remove)
    .put(app.api.condicaoClinica.put);

  app
    .route("/exame_fisico_versao_medico")
    .get(app.api.exameFisicoVersaoMedico.get)
    .post(app.api.exameFisicoVersaoMedico.post);

  app
    .route("/exame_fisico_versao_medico/:id")
    .get(app.api.exameFisicoVersaoMedico.getById)
    .delete(app.api.exameFisicoVersaoMedico.remove)
    .put(app.api.exameFisicoVersaoMedico.put);

  app
    .route("/condicao_clinica_versao_medico")
    .get(app.api.condicaoClinicaVersaoMedico.get)
    .post(app.api.condicaoClinicaVersaoMedico.post);

  app
    .route("/condicao_clinica_versao_medico/:id")
    .get(app.api.condicaoClinicaVersaoMedico.getById)
    .delete(app.api.condicaoClinicaVersaoMedico.remove)
    .put(app.api.condicaoClinicaVersaoMedico.put);

  app
    .route("/sintoma_versao_paciente")
    .get(app.api.sintomaVersaoPaciente.get)
    .post(app.api.sintomaVersaoPaciente.post);

  app
    .route("/sintoma_versao_paciente/:id")
    .get(app.api.sintomaVersaoPaciente.getById)
    .delete(app.api.sintomaVersaoPaciente.remove)
    .put(app.api.sintomaVersaoPaciente.put);
};
