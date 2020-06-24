exports.up = function (knex) {
  return knex.schema.createTable("sintomas", (table) => {
    table.increments("sintomas_id").primary();
    table.string("sintomas_nome");
    table.integer("sintomas_valor");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("sintomas");
};
