
exports.up = function(knex) {
    return knex.schema.createTable("versaoMedico", table => {
        table.increments("versaoMedico_id").primary();
        table.integer("avaliacao_id").unsigned();
        table.foreign("avaliacao_id").references("avaliacao_id").inTable("avaliacao").onDelete('CASCADE').onUpdate('CASCADE');
        table.string("versaoMedico_avaliacaoGlobal");
        table.integer("versaoMedico_pontuacaoTotal");
        table.decimal("versaoMedico_q1PercentualPeso");
        table.string("versaoMedico_q1DiagnosticoRelevante");
        table.integer("versaoMedico_q2Estadiamento");
        table.string("versaoMedico_q2Outro");
        table.integer("versaoMedico_q3Febre");
        table.integer("versaoMedico_q3DuracaoFebre");
        table.integer("versaoMedico_q3Corticosteroides");
        table.integer("versaoMedico_quadro1");
        table.integer("versaoMedico_quadro2");
        table.integer("versaoMedico_quadro3");
        table.integer("versaoMedico_quadro4");
        table.integer("versaoMedico_quadro5");
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("versaoMedico")
};
