import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    res.data = await fighterService.getAll();
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    res.data = await fighterService.getById(id);
    if (!res.data) {
      return res.status(404).json({ message: `Fighter with id '${id}' not found` });
    }
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.post("/", createFighterValid, async (req, res, next) => {
  try {
    res.data = await fighterService.create(req.body);
    res.status(201); // Set status code to 201 Created
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.patch("/:id", updateFighterValid, async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedFighter = await fighterService.update(id, req.body);
    if (!updatedFighter) {
      return res.status(404).json({ message: `Fighter with id '${id}' not found` });
    }
    res.data = updatedFighter;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedFighter = await fighterService.delete(id);
    if (!deletedFighter) {
      return res.status(404).json({ message: `Fighter with id '${id}' not found` });
    }
    res.status(204);
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

export { router };