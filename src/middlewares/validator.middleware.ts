import type { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';

type ValuesUpType = {
  fullName: string;
  password: string;
  email: string;
  dob: string;
};
type ValuesInType = {
  password: string;
  email: string;
};

const userSchemaUp = yup.object<Record<keyof ValuesUpType, yup.AnySchema>>({
  fullName: yup.string().required('fullName required'),
  password: yup.string().required('password required'),
  email: yup.string().email().required('email required'),
  dob: yup.string().required('You not born?'),
});

const userSchemaIn = yup.object<Record<keyof ValuesInType, yup.AnySchema>>({
  password: yup.string().required('password required'),
  email: yup.string().email().required('email required'),
});

const validateSingUp =
(schema: yup.AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validate({
      body: req.body,
      email: req.body.email,
      password: req.body.password,
      fullName: req.body.fullName,
      dob: req.body.dob,
    });
    return next();
  } catch (error) {
    res.status(501).send(error.message);
  }
};

const validateSingIn =
(schema: yup.AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validate({
      body: req.body,
      email: req.body.email,
      password: req.body.password,
    });
    return next();
  } catch (error) {
    res.status(501).send(error.message);
  }
};

export default { validateSingUp, validateSingIn, userSchemaUp, userSchemaIn };
