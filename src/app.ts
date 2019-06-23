import express from "express";
import bodyParser from "body-parser";
import * as helpers from "./helpers";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/getAllOrders", (req, res, next) => {
  try {
    res.json(helpers.getAllOrdersJSON());
  } catch (e) {
    next(e);
  }
});

app.post("/api/registerOrder", async function (req, res, next) {
  if (!req.body.order) {
    return res.send({ status: "error", message: "missing order information" });
  } else {
    try {
      const result = await helpers.registerOrder(req.body.order);
      const msg = result === 'Order already exists' ? result : "Registered Product successfully";
      res.status(200).send(msg);
    } catch (error) {
      next(error);
    }
  }
});

app.get("/api/getOrderSummary", async function (req, res, next) {
  try {
    res.status(200).json(await helpers.getOrderSummary());
  } catch (e) {
    next(e);
  }
});

app.post("/api/cancelOrder", async function (req, res) {
  if (!req.body.order) {
    return res.send({ status: "error", message: "missing order information" });
  } else {
    const result = await helpers.cancelOrder(req.body.order);
    res.status(200).send(result);
  }
});

export default app;