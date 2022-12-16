/* eslint-disable no-console */
import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { extraFields } from '../utils/extraFieldsYup';
import CustomError from '../utils/customErrors/customErrors';
import errorsMessages from '../utils/customErrors/errors';

type ParamsType = {
  type: string;
  errors: string[];
  path: string;
};

type ErrorType = {
  inner: ParamsType[];
  errors: string[];
};

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

      const invalidFields = extraFields(schema, req);

      if (invalidFields) {
        throw new CustomError(
          StatusCodes.CONFLICT,
          errorsMessages.EXTRA_FIELD,
        );
      }

      const errorArr: Array<{key: string; path: string; message: string[]}> = [];

      const addErrors = (err: ErrorType) => {
        err.inner.forEach((item) => {
          errorArr.push({
            key: item.type,
            path: item.path,
            message: item.errors,
          });
        });
      };
      try {
        await yupSchema.validate(req, { abortEarly: false });
      } catch (error) {
        addErrors(error);
        throw new CustomError(
          StatusCodes.CONFLICT,
          errorsMessages.ERRORS_YUP = 'jjjj',
          errorArr,
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
  return validationMiddleware;
};
