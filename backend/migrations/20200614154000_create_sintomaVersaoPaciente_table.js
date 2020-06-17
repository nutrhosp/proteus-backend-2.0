
exports.up = function(knex) {
    return knex.schema.createTable("sintomaVersaoPaciente", table => {
        table.increments("sintomaVersaoPaciente_id").primary();
        table.integer("versaoPaciente_id").unsigned();
        table.integer("sintomas_id").unsigned();
        table.foreign("versaoPaciente_id").references("versaoPaciente_id").inTable("versaoPaciente").onDelete('CASCADE').onUpdate('CASCADE');
        table.foreign("sintomas_id").references("sintomas_id").inTable("sintomas").onDelete('CASCADE').onUpdate('CASCADE');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("sintomaVersaoPaciente")
};
