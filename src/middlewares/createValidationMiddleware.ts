import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import CustomError from '../utils/customErrors/customErrors';
import errorsMessages from '../utils/customErrors/errors';
import type { SchemaType, ErrorType } from '../types/validationType';

export const createValidationMiddleware = (schema: SchemaType) => {
  const validationMiddleware: Handler = async (req, res, next) => {
    try {
      const rootShape: Record<string, yup.AnyObjectSchema> = {};

      Object.entries(schema).forEach(([key, value]) => {
        rootShape[key] = yup.object().shape(value).noUnknown();
        // rootShape[key] = yup.object().shape(value).noUnknown().strict();
      });

      const yupSchema = yup.object().shape(rootShape);

      const errorArr: Array<{ key: string; path: string; message: string }> = [];

      await yupSchema.validate(req, { abortEarly: false })
        .catch((err: ErrorType) => {
          err.inner.forEach((item) => {
            const [path, key] = item.path.split('.');
            errorArr.push({
              key: key || item.params?.unknown,
              path,
              message: item.errors.join(),
            });
          });
        });

      if (errorArr.length) {
        throw new CustomError(
          StatusCodes.CONFLICT,
          errorsMessages.ERRORS_YUP,
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
