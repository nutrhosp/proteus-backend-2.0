
exports.up = function(knex) {
    return knex.schema.createTable("paciente", table => {
        table.increments("paciente_id").primary();
        table.string("paciente_nome");
        table.date("paciente_dataNascimento");
        table.string("paciente_telefone");
        table.string("paciente_email");
        table.string("paciente_rg");
        table.string("paciente_cpf");
        table.text("paciente_prontuario");
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("paciente")
};
