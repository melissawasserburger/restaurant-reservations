const knex = require("../db/connection");

async function list(date) {
    return knex("reservations")
        .select("*")
        .where({
            "reservation_date": date,
            status: "seated",
            status: "booked",
        })
        .orderBy("reservation_time")
}

async function create(reservation) {
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((reservations) => reservations[0])
}

async function read(reservation_Id) {
    return knex("reservations")
        .select("*")
        .where({reservation_id: reservation_Id})
        .first();
}

async function update(reservation_id) {
    return knex("reservations")
        .select("*")
        .where({reservation_id: reservation_id})
        .update({status: "seated"}, "*")
}

module.exports = {
    list,
    create,
    read,
    update,
}