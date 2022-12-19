import type * as yup from 'yup';
import type { Request } from 'express';
import _ from 'lodash';
import errorsMessages from '../utils/customErrors/errors';

type ShapeFieldType = {
  [key: string]: yup.StringSchema | yup.NumberSchema | yup.BooleanSchema | yup.DateSchema;
};

type SchemaType = {
  body?: ShapeFieldType;
  query?: ShapeFieldType;
  params?: ShapeFieldType;
};

export const extraFields = (schema: SchemaType, object: Request) => {
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
  if (invalidFields.length) {
    errorsMessages.EXTRA_FIELD = `Extra fields found ${invalidFields}`;
    return invalidFields;
  }
  return false;
};
