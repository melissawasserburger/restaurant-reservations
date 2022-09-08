exports.up = function(knex) {
    return knex.schema.createTable("tables", (table) => {
    table.increments("table_id").primary();
    table.integer("capacity");
    table.string("table_name");
    table.string("status").defaultTo("Free")
    table.integer("reservation_id").defaultTo(null);
    table
      .foreign("reservation_id")
      .references("reservation_id")
      .inTable("reservations")
      .onDelete("CASCADE");
    table.timestamps(true, true);
})};

exports.down = function(knex) {
    return knex.schema.dropTable("tables");
};
