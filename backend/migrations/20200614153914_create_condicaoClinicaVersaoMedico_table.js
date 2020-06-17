
exports.up = function(knex) {
    return knex.schema.createTable("condicaoClinicaVersaoMedico", table => {
        table.increments("condicaoClinicaVersaoMedico_id").primary();
        table.integer("versaoMedico_id").unsigned();
        table.integer("condicaoClinica_id").unsigned();
        table.foreign("versaoMedico_id").references("versaoMedico_id").inTable("versaoMedico").onDelete('CASCADE').onUpdate('CASCADE');
        table.foreign("condicaoClinica_id").references("condicaoClinica_id").inTable("condicaoClinica").onDelete('CASCADE').onUpdate('CASCADE');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("condicaoClinicaVersaoMedico")
};
