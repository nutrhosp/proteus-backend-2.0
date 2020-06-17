
exports.up = function(knex) {
    return knex.schema.createTable("exameFisicoVersaoMedico", table => {
        table.increments("exameFisicoVersaoMedico_id").primary();
        table.integer("versaoMedico_id").unsigned();
        table.integer("exameFisico_id").unsigned();
        table.foreign("versaoMedico_id").references("versaoMedico_id").inTable("versaoMedico").onDelete('CASCADE').onUpdate('CASCADE');
        table.foreign("exameFisico_id").references("exameFisico_id").inTable("exameFisico").onDelete('CASCADE').onUpdate('CASCADE');
        table.string("exameFisicoVersaoMedico_valor");
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("exameFisicoVersaoMedico")
};
