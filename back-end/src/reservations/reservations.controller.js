/**
 * List handler for reservation resources
 */

const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const date = req.query.date;
  console.log(date)
  const data = await service.list(date);
  res.json({ data: data });
}

// VALIDATION PIPELINE
const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];


// this validation needs work
function hasRequiredFields(req, res, next) {
  const data = req.body;
  
  try {
    VALID_PROPERTIES.forEach((property) => {
      if (!data[property]) {
        const error = new Error(`A '${property}' property is required.`);
        error.status = 400;
        throw error;
      }
    });
    next();
  } catch (error) {
    next(error);
  }
}

// this validation needs work
function hasOnlyValidProperties(req, res, next) {
  const data = req.body;

  const invalidFields = Object.keys(data).filter((field) => {
    if (field === "people") {
      return typeof field.value === "number"
    }
    return typeof field.value === "string"
  });
  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

// getDay returns a num 0-6 where 0 is Monday, 6 is Sunday
//validation check for 1 --> Tuesday
function isTuesday(req, res, next) {
  const { reservation_date } = req.body;
  const dayNum = new Date(reservation_date).getDay();
  if (dayNum === 1) {
    return next({
      status: 400,
      message: `Sorry! We're closed on Tuesdays!`
    })
  }
  next();
}

/* validation currently checking if:
    - req has all required fields
    - req has all valid entries of fields
    - reservation DOES NOT take place on Tuesday
*/
async function create(req, res, next) {
  const data = await service.create(req.body);
  res.status(201).json({ data });
}

module.exports = {
  list,
  create: [
    hasRequiredFields,
    hasOnlyValidProperties,
    isTuesday,
    asyncErrorBoundary(create),
  ],
};
