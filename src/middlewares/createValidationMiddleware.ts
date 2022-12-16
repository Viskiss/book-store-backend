/* eslint-disable no-console */
import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
// import { isEqual } from 'lodash';
import * as yup from 'yup';
import CustomError from '../utils/customErrors/customErrors';
import errorsMessages from '../utils/customErrors/errors';

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

      try {
        await yupSchema.validate(req, { abortEarly: false });
      } catch (error) {
        const err = error.errors.toString();
        errorsMessages.ERRORS_YUP = err;
        throw new CustomError(
          StatusCodes.CONFLICT,
          errorsMessages.ERRORS_YUP,
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
  return validationMiddleware;
};
