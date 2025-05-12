import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    res.data = await userService.getAll();
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    res.data = await userService.getById(id);
    if (!res.data) {
      return res.status(404).json({ message: `User with id '${id}' not found` });
    }
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.post("/", createUserValid, async (req, res, next) => {
  try {
    res.data = await userService.create(req.body);
    res.status(201); // Set status code to 201 Created
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.patch("/:id", updateUserValid, async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedUser = await userService.update(id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ message: `User with id '${id}' not found` });
    }
    res.data = updatedUser;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedUser = await userService.delete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: `User with id '${id}' not found` });
    }
    res.status(204); // Set status code to 204 No Content for successful deletion
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

export { router };