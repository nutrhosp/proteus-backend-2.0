
exports.up = function(knex) {
    return knex.schema.createTable("avaliacaoGlobal", table => {
        table.increments("avaliacaoGlobal_id").primary();
        table.integer("versaoMedico_id").unsigned();
        table.foreign("versaoMedico_id").references("versaoMedico_id").inTable("versaoMedico").onDelete('CASCADE').onUpdate('CASCADE');
        table.integer("avaliacaoGlobal_peso");
        table.integer("avaliacaoGlobal_nutrientes");
        table.integer("avaliacaoGlobal_impactoNutricional");
        table.integer("avaliacaoGlobal_funcionalidade");
        table.integer("avaliacaoGlobal_exameFisico");
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("avaliacaoGlobal")
};
