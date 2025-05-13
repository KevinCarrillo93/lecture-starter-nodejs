import { Router } from "express";
import { fightService } from "../services/fightService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    res.data = await fightService.create(req.body);
    res.status(201);
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.get("/", async (req, res, next) => {
  try {
    res.data = await fightService.getAll();
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    res.data = await fightService.getById(id);
    if (!res.data) {
      res.status(404);
      throw new Error(`Fight with id '${id}' not found`);
    }
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

export { router };