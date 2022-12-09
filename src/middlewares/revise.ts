import type { Handler } from 'express';
import type * as yup from 'yup';

export const revise =
  (schema: yup.AnySchema): Handler => async (req, res, next) => {
    try {
      await schema.validate({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      return next();
    } catch (error) {
      res.status(501).send(error.message);
    }
  };
