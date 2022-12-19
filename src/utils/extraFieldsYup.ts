import type * as yup from 'yup';
import type { Request } from 'express';
import _ from 'lodash';
import { StatusCodes } from 'http-status-codes';
import CustomError from './customErrors/customErrors';

type ShapeFieldType = {
  [key: string]: yup.StringSchema | yup.NumberSchema | yup.BooleanSchema | yup.DateSchema;
};

type SchemaType = {
  body?: ShapeFieldType;
  query?: ShapeFieldType;
  params?: ShapeFieldType;
};

export const extraFields = (schema: SchemaType, object: Request) => {
  let extraFields = '';
  const keysRequest = [
    ...Object.keys(object.body),
    ...Object.keys(object.params),
    ...Object.keys(object.query),
  ];

  const keysSchema = [
    ...Object.keys(schema.body ? schema.body : {}),
    ...Object.keys(schema.params ? schema.params : {}),
    ...Object.keys(schema.query ? schema.query : {}),
  ];

  const invalidFields = _.difference(keysRequest, keysSchema);
  const invString = invalidFields.join(', ');
  extraFields = `Extra fields found ${invString}`;
  if (invalidFields.length) {
    throw new CustomError(
      StatusCodes.CONFLICT,
      extraFields,
    );
  }
  return false;
};
