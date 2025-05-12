import { FIGHTER } from "../models/fighter.js";

const createFighterValid = (req, res, next) => {
  const { id, name, power, defense, health } = req.body;
  const fields = Object.keys(req.body);

  // Id in the request body should NOT be present
    if (id) {
        return res.status(400).json({ message: "Id should not be present in the request body" });
    }

  // The presence of any extra fields (not from the models folder) is not allowed
  const allowedFields = ['name', 'power', 'defense', 'health'];
  const extraFields = fields.filter(field => !allowedFields.includes(field));
  if (extraFields.length > 0) {
    return res.status(400).json({ message: `Extra fields are not allowed: ${extraFields.join(', ')}` });
  }

  // Presence of fields: When creating a fighter — all fields are required, except for id and health
  if (!name) {
    return res.status(400).json({ message: "name is required" });
  }
  if (power === undefined) {
    return res.status(400).json({ message: "power is required" });
  }
  if (defense === undefined) {
    return res.status(400).json({ message: "defense is required" });
  }

  // Fields format validation
  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ message: "name must be a non-empty string" });
  }
  if (typeof power !== 'number' || power < 1 || power > 100) {
    return res.status(400).json({ message: "power must be a number between 1 and 100" });
  }
  if (typeof defense !== 'number' || defense < 1 || defense > 10) {
    return res.status(400).json({ message: "defense must be a number between 1 and 10" });
  }
  if (health !== undefined && (typeof health !== 'number' || health < 80 || health > 120)) {
    return res.status(400).json({ message: "health must be a number between 80 and 120" });
  }

  next();
};

const updateFighterValid = (req, res, next) => {
  const { id } = req.params;
  const { name, power, defense, health } = req.body;
  const fields = Object.keys(req.body);

    // Id in the request body should NOT be present
    if (req.body.id) {
        return res.status(400).json({ message: "Id should not be present in the request body" });
    }

  // The presence of any extra fields (not from the models folder) is not allowed
  const allowedFields = ['name', 'power', 'defense', 'health'];
  const extraFields = fields.filter(field => !allowedFields.includes(field));
  if (extraFields.length > 0) {
    return res.status(400).json({ message: `Extra fields are not allowed: ${extraFields.join(', ')}` });
  }

  // When updating a user or a fighter — at least one field from the model must be present
  if (fields.length === 0) {
    return res.status(400).json({ message: "At least one field must be present for update" });
  }

  // Fields format validation
    if (name === "") {
        return res.status(400).json({ message: "name cannot be empty" });
    }
  if (health !== undefined && (typeof health !== 'number' || health < 80 || health > 120)) {
    return res.status(400).json({ message: "health must be a number between 80 and 120" });
  }
  if (power !== undefined && (typeof power !== 'number' || power < 1 || power > 100)) {
    return res.status(400).json({ message: "power must be a number between 1 and 100" });
  }
  if (defense !== undefined && (typeof defense !== 'number' || defense < 1 || defense > 10)) {
    return res.status(400).json({ message: "defense must be a number between 1 and 10" });
  }

  next();
};

export { createFighterValid, updateFighterValid };