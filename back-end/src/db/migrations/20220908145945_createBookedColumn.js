exports.up = function(knex) {
    return knex.schema.table('reservations', table => {
      table.string('status').notNullable().defaultTo('Booked');
    })
  };

exports.down = function(knex) {
    return knex.schema.alterTable('reservations', table => {
        table.dropColumn('status');
      })
};
