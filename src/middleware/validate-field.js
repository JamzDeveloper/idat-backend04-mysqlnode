import { validationResult } from "express-validator";

const validateFields = async (req, resp, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }

    next();
  } catch (err) {}
};

export default validateFields;
