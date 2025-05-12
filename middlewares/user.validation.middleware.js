import { USER } from "../models/user.js";

const createUserValid = (req, res, next) => {
  const { id, firstName, lastName, email, phone, password } = req.body;
  const fields = Object.keys(req.body);

  // Id in the request body should NOT be present
  if (id) {
    return res.status(400).json({ message: "id should not be present in the request body" });
  }

  // The presence of any extra fields (not from the models folder) is not allowed
  const allowedFields = ['firstName', 'lastName', 'email', 'phone', 'password'];
  const extraFields = fields.filter(field => !allowedFields.includes(field));
  if (extraFields.length > 0) {
    return res.status(400).json({ message: `Extra fields are not allowed: ${extraFields.join(', ')}` });
  }

  // Presence of fields: When creating a user — all fields are required, except for id
  if (!firstName) {
    return res.status(400).json({ message: "firstName is required" });
  }
  if (!lastName) {
    return res.status(400).json({ message: "lastName is required" });
  }
  if (!email) {
    return res.status(400).json({ message: "email is required" });
  }
  if (!phone) {
    return res.status(400).json({ message: "phone is required" });
  }
  if (!password) {
    return res.status(400).json({ message: "password is required" });
  }

  // Fields format validation
  if (!/^[\w-\.]+@gmail\.com$/.test(email)) {
    return res.status(400).json({ message: "Invalid email format. Only @gmail.com is allowed" });
  }
  if (!/^\+380\d{9}$/.test(phone)) {
    return res.status(400).json({ message: "Invalid phone format. Use +380xxxxxxxxx" });
  }
  if (password.length < 4) {
    return res.status(400).json({ message: "password must be at least 4 characters long" });
  }

  next();
};

const updateUserValid = (req, res, next) => {
  const { id } = req.params;
  const { firstName, lastName, email, phone, password } = req.body;
  const fields = Object.keys(req.body);

    // Id in the request body should NOT be present
    if (req.body.id) {
        return res.status(400).json({ message: "Id should not be present in the request body" });
    }

  // The presence of any extra fields (not from the models folder) is not allowed
  const allowedFields = ['firstName', 'lastName', 'email', 'phone', 'password'];
  const extraFields = fields.filter(field => !allowedFields.includes(field));
  if (extraFields.length > 0) {
    return res.status(400).json({ message: `Extra fields are not allowed: ${extraFields.join(', ')}` });
  }

  // When updating a user or a fighter — at least one field from the model must be present
  if (fields.length === 0) {
    return res.status(400).json({ message: "At least one field must be present for update" });
  }

  // Fields format validation
  if (firstName === "") {
    return res.status(400).json({ message: "firstName cannot be empty" });
  }
  if (lastName === "") {
    return res.status(400).json({ message: "lastName cannot be empty" });
  }
  if (email === "") {
        return res.status(400).json({ message: "email cannot be empty." });
  } else if (email && !/^[\w-\.]+@gmail\.com$/.test(email)) {
    return res.status(400).json({ message: "Invalid email format. Only @gmail.com is allowed" });
  }
  if (phone === "") {
        return res.status(400).json({ message: "phone cannot be empty." });
  } else if (phone && !/^\+380\d{9}$/.test(phone)) {
    return res.status(400).json({ message: "Invalid phone format. Use +380xxxxxxxxx" });
  }
  if (password === "") {
        return res.status(400).json({ message: "password cannot be empty." });
  } else if (password && password.length < 4) {
    return res.status(400).json({ message: "password must be at least 4 characters long" });
  }

  next();
};

export { createUserValid, updateUserValid };