const knex = require("../db/connection");

async function list(date) {
  return knex("reservations")
    .select("*")
    .where({
      reservation_date: date,
    })
    .whereNot({
      status: "finished",
    })
    .whereNot({
      status: "cancelled",
    })
    .orderBy("reservation_time");
}

function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

async function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((reservations) => reservations[0]);
}

async function read(reservation_Id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservation_Id })
    .first();
}

async function update(newReservation) {
  const {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
  } = newReservation;

  return knex("reservations")
    .select("*")
    .where({ reservation_id: newReservation.reservation_id })
    .update(
      {
        first_name: first_name,
        last_name: last_name,
        mobile_number: mobile_number,
        reservation_date: reservation_date,
        reservation_time: reservation_time,
        people: people,
      },
      "*"
    );
}

async function updateToSeated(reservation_id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservation_id })
    .update({ status: "seated" }, "*");
}

async function updateToCancelled(reservation_id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservation_id })
    .update({ status: "cancelled" }, "*");
}

async function updateToFinished(reservation_id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservation_id })
    .update({ status: "finished" }, "*");
}

module.exports = {
  list,
  search,
  create,
  read,
  update,
  updateToSeated,
  updateToCancelled,
  updateToFinished,
};
