/**
 * List handler for reservation resources
 */

const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const moment = require("moment");

async function list(req, res) {
  const date = req.query.date;
  const data = await service.list(date);
  res.json({ data: data });
}

// VALIDATION PIPELINE STARTS HERE
const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

function hasRequiredFields(req, res, next) {
  const { data = {} } = req.body;
  const map = new Map();
  for (let property in data) {
    map.set(property);
  }

  for (let property of VALID_PROPERTIES) {
    if (!map.has(property)) {
      return next({
        status: 400,
        message: `Must include a ${property} field.`,
      });
    }
  }

  next();
}

// this validation checks for no empty strings in name, valid format for phone number, and people >= 1
function hasValidFieldInputs(req, res, next) {
  let { first_name, last_name, mobile_number, people } = req.body.data;
  console.log(people);
  people = Number(people);
  if (people <= 0) {
    if (typeof people !== "number") {
      return next({
        status: 400,
        message: `Number of guests must be at least one. You entered: ${people} people.`,
      });
    }
  }

  first_name = first_name.replace(" ", "");
  last_name = last_name.replace(" ", "");
  if (first_name === "" || last_name === "") {
    return next({
      status: 400,
      message: `Please provide a first_name and last_name.`,
    });
  }

  // Valid number formats:
  // (123) 456-7890, (123)456-7890, 123-456-7890, 123.456.7890, 1234567890, +31636363634 or 075-63546725
  const re = new RegExp(
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  );
  if (!re.test(mobile_number)) {
    return next({
      status: 400,
      message: `Please provide a valid mobile_number in the format xxx-xxx-xxxx`,
    });
  }

  next();
}

// this validation uses the library Moment.js to test reservation_date, which is currently saved as a dev dependency
// run 'npm install moment --save' to install
// though less of an issue in this context, moment is a legecy project and generally not recommended because of its size
function validDateAndTime(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  console.log(reservation_date);
  if (!moment(reservation_date, "YYYY-MM-DD").isValid()) {
    return next({
      status: 400,
      message: `Please enter a valid reservation_date.`,
    });
  }

  const re = new RegExp(/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/);
  if (!re.test(reservation_time)) {
    return next({
      status: 400,
      message: `Please enter a valid reservation_time.`,
    });
  }

  next();
}

// this validation checks if reservation_date, reservation_time is entered, formatted, and in future
function reservationIsInFuture(req, res, next) {
  let { reservation_date, reservation_time } = req.body.data;
  console.log(reservation_date);
  reservation_date = reservation_date.replace(" ", "");
  reservation_time = reservation_time.replace(" ", "");
  if (reservation_date === "" || reservation_time === "") {
    return next({
      status: 400,
      message: `Please enter a valid reservation_date and reservation_time.`,
    });
  }

  const todaysDate = new Date();
  const submittedDate = new Date(`${reservation_time} ${reservation_date}`);
  if (submittedDate < todaysDate) {
    return next({
      status: 400,
      message: `Reservations must be placed in the future.`,
    });
  }
  next();
}

// this validation checks if reservation_time and _date is within business hours
// business hours: 10:30 AM - 9:30 PM, everyday except Tuesday
function isDuringBusinessHours(req, res, next) {
  let { reservation_date, reservation_time } = req.body.data;
  console.log(reservation_date);
  // getDay returns a num 0-6 where 0 is Monday, 6 is Sunday
  //validation check for 1 --> Tuesday
  const dayNum = new Date(reservation_date).getDay();
  if (dayNum === 1) {
    return next({
      status: 400,
      message: `Sorry! We're closed on Tuesdays!`,
    });
  }

  reservation_time = reservation_time.replace(":", "");
  if (reservation_time < 1030 || reservation_time > 1730) {
    return next({
      status: 400,
      message: `Please place a reservation during business hours: 10:30 AM - 9:30 PM`,
    });
  }

  next();
}

/* validation currently checking if:
    - req has all required fields
    - req has all valid entries of fields
    - reservation is NOT in the past
    - reservation DOES NOT take place on Tuesday, and within 10:30 AM - 9:30 PM timeframe
*/
async function create(req, res, next) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    hasRequiredFields,
    hasValidFieldInputs,
    validDateAndTime,
    reservationIsInFuture,
    isDuringBusinessHours,
    asyncErrorBoundary(create),
  ],
};
