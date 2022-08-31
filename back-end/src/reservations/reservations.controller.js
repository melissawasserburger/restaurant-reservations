/**
 * List handler for reservation resources
 */

const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const date = req.query.date
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

function hasRequiredFields(req, res, next) {
  console.log(req.body)
  const data = req.body;
  
  try {
    VALID_PROPERTIES.forEach((property) => {
      console.log(data)
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

function hasOnlyValidProperties(req, res, next) {
  const data = req.body;

  const invalidFields = Object.keys(data).filter((field) => {
    console.log(field);
    if (field === "people") {
      return typeof field.value === "number"
    }
    return typeof field.value === "string"
  });
  console.log(invalidFields);
  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

/* validation currently checking if:
    - req has all required fields
    - req has all valid entries of fields

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
    asyncErrorBoundary(create),
  ],
};
