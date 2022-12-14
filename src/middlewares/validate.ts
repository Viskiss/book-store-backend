import type { Handler } from 'express';
import * as yup from 'yup';
import {
  StatusCodes,
} from 'http-status-codes';

type ShapeFieldType = {
  [key: string]: yup.StringSchema | yup.NumberSchema | yup.BooleanSchema | yup.DateSchema;
};

type SchemaType = {
  body?: ShapeFieldType;
  query?: ShapeFieldType;
  params?: ShapeFieldType;
};

export const createValidationMiddleware = (schema: SchemaType) => {
  const validationMiddleware: Handler = async (req, res, next) => {
    try {
      const rootShape: Record<string, yup.AnyObjectSchema> = {};
      Object.entries(schema).forEach(([key, value]) => {
        rootShape[key] = yup.object().shape(value);
      });

      const yupSchema = yup.object().shape(rootShape);

      await yupSchema.validate({ body: req.body, params: req.params, query: req.query });
      next();
    } catch (err) {
      res
        .status(StatusCodes.NOT_IMPLEMENTED)
        .json([{ key: err.name, path: err.path, message: err.message }]);
    }
  };
  return validationMiddleware;
};
