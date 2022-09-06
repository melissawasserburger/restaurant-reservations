const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
    const data = await service.list();
    res.json({ data: data });
  }

async function create(req, res, next) {
    console.log(req.body.data);
    const table = req.body.data;
    const data = await service.create(table);
    res.status(201).json({data});
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    create: [asyncErrorBoundary(create)],   
};