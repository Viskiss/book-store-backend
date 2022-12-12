import type { Handler } from 'express';
import * as yup from 'yup';
import {
  ReasonPhrases,
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

      const errors: Array<{
        key: string;
        path: string;
        message: string;
      }> = [{ key: '', path: req.path, message: req.statusMessage }];
      yupSchema.validate(req);
      console.log(errors);
      next();
    } catch (err) {
      res
        .status(StatusCodes.NOT_IMPLEMENTED)
        .send(err);
    }
  };
  return validationMiddleware;
};

// export const applyValidateSchema =
//   (schema: object): Handler => async (req, res, next) => {
//     try {
//       await schema({
//         body: req.body,
//         params: req.params,
//         query: req.query,
//       });
//       return next();
//     } catch (error) {
//       res
//         .status(StatusCodes.NOT_IMPLEMENTED)
//         .send(ReasonPhrases.NOT_IMPLEMENTED);
//     }
//   };
